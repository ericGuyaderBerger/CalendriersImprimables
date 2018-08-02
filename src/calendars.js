const SEP = ' + ';
const nbMsInDay = 8.64e+7

let CalendarTools = {
  tasksCalendars: ['Chantiers','Containers','Vitres','Ponctuels','Particuliers','Travaux spéciaux','Sous-traitance','Rendez-vous !','Contacts'],
  nomCalendrierMO: 'Mains-d\'oeuvre',
  gapi: {},
  /**
   * Retourne la promesse d'une connexion à l'API Google
   * @param {google.client} gapi 
   * @returns {Promise}
   */
  logIn(gapi){
    return new Promise( (resolve,reject ) => {
      resolve( gapi.auth2.getAuthInstance().signIn()
      .then( () => this.gapi = gapi )
      .catch( err => reject(err) ) )
    })
  },
  /**
   * Retourne l'id du calendrier à partir de son nom
   * @param {String} name Le nom du calendrier
   * @returns {Promise}
   */
  calendarIdFromName(name) {
    return new Promise( (resolve,reject) => {
      let calInfosProm = this.calendarInfosFromName(name);
      calInfosProm.then(cal => resolve(cal.id))
      .catch( err => reject('The API returned an error: ' + err) );
    })
  },

  /**
   * Retourne tous les calendriers 
   * @returns {Promise}
   */
  getCalendars(){
    return new Promise( (resolve,reject) => {
      this.gapi.client.calendar.calendarList.list({}).then( res => {
        resolve(res.result.items)
      })
      .catch( err => reject('The API returned an error: ' + err) )
    })
  },

/**
   * Retourne tous les calendriers de tâches, triés selon l'ordre des calendriers 
   * dans this.tasksCalendars
   * @returns {Promise}
   */
  getTasksCalendars(){
    return new Promise( (resolve,reject) => {
      this.getCalendars()
        .then ( calendars => {
          let ret = []
          this.tasksCalendars.map( calName => {
            let calInfos = calendars.find( cal => cal.summary === calName )
            if(calInfos){
              ret.push( calInfos )
            }
          })
          resolve(ret)
        })
        .catch( err => reject('The API returned an error: ' + err) )
    })
  },

  /**
   * Retourne les infos du calendrier à partir de son nom
   * @param {String} name Le nom du calendrier
   * @returns {Promise}
   */
  calendarInfosFromName(name) {
    return new Promise( (resolve,reject) => {
      this.getCalendars().then( calendars => {
        calendars.forEach( cal => {
          if(cal.summary === name){
            resolve(cal)
          }
        })
        reject('Calendar Not found')
      })
      .catch( err => reject('The API returned an error: ' + err) );
    })
  },

  /**
   * Retourne les événements d'un calendrier entre deux dates
   * @param {Int} calId Id du calendrier
   * @param {Date} start Date de début
   * @param {Date} end Date de fin
   * @returns {Promise}
   */
  getEvents(calId,start,end){
    return new Promise( (resolve,reject) => {
      this.gapi.client.calendar.events.list(
        {
          calendarId:calId,
          timeMin:start.toISOString().replace('Z','+02:00'),
          timeMax:end.toISOString().replace('Z','+02:00'),
          singleEvents : true
        }
      )
      .then( res  => {
        const events = res.result.items;
        resolve(events);
      })
      .catch( err => reject('The API returned an error: ' + err) );
      
    })
  },
  /**
   * Retourne les employés et leurs tâches 
   * @param {gapi.client.calendar} cal 
   * @param {Date} start 
   * @param {Date} end 
   * @returns {Promise}
   */
  getEventsForPlaning(cal,start,end){
    return new Promise( (resolve,reject) => {
      this.gapi.client.calendar.events.list(
        {
          calendarId:cal.id,
          timeMin:start.toISOString().replace('Z','+02:00'),
          timeMax:end.toISOString().replace('Z','+02:00'),
          singleEvents: true
        }
      )
      .then( res  => {
        const events = res.result.items;
        events.forEach( event => event.cal=cal)
        resolve(events);
      })
      .catch( err => reject('The API returned an error: ' + err) );
      
    })
  },

  /**
   * Obtient les employés présents dans le calendrier entre deux dates
   * @param {Date} start Début de la période du calendrier
   * @param {Date} end Fin de la période du calendrier
   * @returns {Promise}
   */
  getEmployes(start,end){
    return new Promise( (resolve,reject) => {
      let nomCalendrier = this.nomCalendrierMO;
      let calIdProm = this.calendarIdFromName(nomCalendrier);
      calIdProm.then( id => {
        resolve(this.getEvents(id,start,end))
      }).catch( (reason) => reject(reason) );
    });
  },

  /**
   * Retourne tous les employés présents dans le calendrier entre deux dates sans doublon
   * et de façon dissociée pour les "employés double" (pe: JEAN-CLAUDE + BENOIT)
   * 
   * @param {Date} start 
   * @param {Date} end 
   * @returns {Array}
   */
  getEmployesDistincts(start){
    return new Promise( (resolve,reject) => {
      let ret = new Set();
      let end = new Date(start.getTime() + 5 * nbMsInDay)
      end.setHours(23,59,59)

      let employesProm = this.getEmployes(start,end)
      employesProm.catch( reason => reject(reason) );
      employesProm
        .then( employes => {
          employes.map( employe => {
            let empName = employe.summary;
          
            if (empName.indexOf(SEP) > -1 ){
              let emps = empName.split(SEP);
              emps.forEach( emp => ret.add(emp) );
            } else {
              ret.add(empName) 
            }
          }) 
        })
        .then( () => resolve([...ret]) );
    });
  },
  /**
   * Renvoie les événements des calendriers des travaux
   * @param {Date} start 
   * @returns {Object} 
   */
  getPlanedEvents(start){
    return new Promise( (resolve,reject) => {
      let calendars = [...this.tasksCalendars,this.nomCalendrierMO];
      let end = new Date(start.getTime() + 5 * nbMsInDay)
      end.setHours(23,59,59,999)
      let ret = {}
      
      // Crée les 5 jours de la semaine, quoi qu'il arrive
      for (let i = 1; i <= 5; i++ ){
        let dt = new Date(start.getTime() + i * nbMsInDay)
        let dtString = dt.toISOString().substr(0,10)
        ret[dtString] = []
      }
      
      let allPromises = calendars.map( calName => {
        let calInfosProm = this.calendarInfosFromName(calName);
        return calInfosProm.then( cal => {
          return this.getEventsForPlaning(cal,start,end)
        })
        
        .catch( (reason) => reject(reason) );
      })
      const allEventsProm = Promise.all( allPromises )
      
      allEventsProm.then( events => {
        let index = 0
        let allEvents = []
        events.forEach( evs => {
          if (evs){ 
            evs.forEach( event => {
                  allEvents.push({dateHeure:event.start.dateTime, timestamp:new Date(event.start.dateTime.substr(0,19)).getTime(),intitule:event.summary,type:event.cal.summary,couleur:event.cal.backgroundColor} )
              })
          }
        })
        allEvents.sort( (a,b) => a.timestamp - b.timestamp )
        allEvents.forEach( event => {
          let dtProp = event.dateHeure.substr(0,10)
          let tache = event
          if( !ret[dtProp] ){
            ret[dtProp] = []
          }

          if(tache.type === this.nomCalendrierMO){
            ret[dtProp].push({nom:tache.intitule, taches:[]})
            index = ret[dtProp].length - 1
          }else{
            ret[dtProp][index].taches.push(tache)
          }
        })
        resolve(ret)  
      })
    });
  }
};

export default CalendarTools; 
