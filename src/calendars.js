// // const fs = require('fs');
// import {google} from 'googleapis'

// const CLIENT_INFOS = {"installed":{"client_id":"841295231115-gtv1gs182u1uphb0hs5u225saus6o075.apps.googleusercontent.com","project_id":"printable-calendar-201807","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"DHNPzqa0jOQ1X4E0s6Dpdcme","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}};
// const TOKEN = {"access_token":"ya29.Glv4BVga3WssTTNpP5USddaDRlpp10ODvUGEElCf7DYaWMWLDej_ujJCVYjeiHh28-Ngg2e8ubDDhccw3HQdfTvTE3HKG4Ad1Mo3eJMSengNIyIwiASQVcdm2kBt","token_type":"Bearer","refresh_token":"1/Wv1Va2HUFDwf_4-Axl6IPcACV6VroaOwDQD4fOQ38m4","expiry_date":1531566873387};

const SEP = ' + ';

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
      //const calendar = google.calendar({version: 'v3', auth});
      // console.log('ok calendarIdFromName')
      // console.log(gapi)
      this.getCalendars().then( calendars => {
        // if (err) reject('The API returned an error: ' + err);
        //const calendars = res.result.items;
        // console.log(calendars);
        calendars.forEach( cal => {
          // console.log(cal)
          if(cal.summary === name){
            // console.log(cal.id)
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
      //const calendar = google.calendar({version: 'v3', auth});
      // console.log('ok getEvents, calId:', calId);
      this.gapi.client.calendar.events.list(
        {
          calendarId:calId,
          timeMin:start.toISOString().replace('Z','+02:00'),
          timeMax:end.toISOString().replace('Z','+02:00'),
          singleEvents : true
        }
      )
      .then( res  => {
        // console.log(res)
        const events = res.result.items;
        // console.log(events)
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
      // let ret = []
      //const calendar = google.calendar({version: 'v3', auth});
      // console.log('ok getEvents, calId:', calId);
      this.gapi.client.calendar.events.list(
        {
          calendarId:cal.id,
          timeMin:start.toISOString().replace('Z','+02:00'),
          timeMax:end.toISOString().replace('Z','+02:00'),
          singleEvents: true
        }
      )
      .then( res  => {
        // console.log(res)
        const events = res.result.items;
        events.map( event => event.cal=cal)
        // console.log(events)
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
      // console.log('ok getEmployes')
      // let oAuth = this.getOAuthClient();
      let nomCalendrier = this.nomCalendrierMO;
      let calIdProm = this.calendarIdFromName(nomCalendrier);
      calIdProm.then( id => {
        // console.log(id)
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
      // console.log('ok getEmployesDistincts');
      
      let ret = new Set();
      let end = new Date(start)
      end.setDate(end.getDate() + 5)
      let employesProm = this.getEmployes(start,end)
      employesProm.catch( reason => reject(reason) );
      employesProm
        .then( employes => {
          // console.log(employes)
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
      let calendars = [this.nomCalendrierMO,...this.tasksCalendars];
      let end = new Date(start)
      let ret = {}
      
      end.setDate(end.getDate() + 5)

      let allPromises = calendars.map( calName => {
        let calInfosProm = this.calendarInfosFromName(calName);
        return calInfosProm.then( cal => {
          return this.getEventsForPlaning(cal,start,end)
            // .then( res => {
            //   // console.log(res)
            //   res.map( event => {
            //     allEvents.push( {dateHeure:event.start.dateTime,intitule:event.summary,type:cal.summary,couleur:cal.backgroundColor}) 
            //   })
            // })
            // .catch( (reason) => reject(reason) )
        })
        
        .catch( (reason) => reject(reason) );
      })
      // console.log('allPromises:',allPromises)
      let allEventsProm = Promise.all( allPromises )
      
      allEventsProm.then( (events) => {
        let allEvents = []
        let index = 0
        // console.log(events)
        events.forEach( evs => {
          if (evs){ 
            evs.map( event => {
                
                // if(allEvents.find( evt => evt.dateHeure===event.start.dateTime && evt.intitule === event.summary ) === undefined )
                  allEvents.push( {dateHeure:event.start.dateTime,intitule:event.summary,type:event.cal.summary,couleur:event.cal.backgroundColor}) 
                // console.log(allEvents)
              })
          }
        })
        allEvents.sort( (a,b) => new Date(a.dateHeure).getTime() - new Date(b.dateHeure).getTime() )
        allEvents.map( event => {
          let dtProp = event.dateHeure.substr(0,10)
          let tache = event
          
          if( !ret[dtProp] ){
            ret[dtProp] = []
            // ret[dtProp].taches = []
          }
          if(tache.type === this.nomCalendrierMO){
            ret[dtProp].push({nom:tache.intitule, taches:[]})
            index++
          }else{
            ret[dtProp][index - 1].taches.push(tache)
          }
          // ret[dtProp].taches.push(event)
        })
        resolve(ret)  
      })
    });
  }
};

export default CalendarTools; 
