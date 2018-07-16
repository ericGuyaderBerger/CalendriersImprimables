// // const fs = require('fs');
// import {google} from 'googleapis'

// const CLIENT_INFOS = {"installed":{"client_id":"841295231115-gtv1gs182u1uphb0hs5u225saus6o075.apps.googleusercontent.com","project_id":"printable-calendar-201807","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"DHNPzqa0jOQ1X4E0s6Dpdcme","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}};
// const TOKEN = {"access_token":"ya29.Glv4BVga3WssTTNpP5USddaDRlpp10ODvUGEElCf7DYaWMWLDej_ujJCVYjeiHh28-Ngg2e8ubDDhccw3HQdfTvTE3HKG4Ad1Mo3eJMSengNIyIwiASQVcdm2kBt","token_type":"Bearer","refresh_token":"1/Wv1Va2HUFDwf_4-Axl6IPcACV6VroaOwDQD4fOQ38m4","expiry_date":1531566873387};

const SEP = ' + ';

let CalendarTools = {
  /**
   * Retourne l'id du calendrier à partir de son nom
   * @param {String} name Le nom du calendrier
   * @param {google.auth.OAuth2} auth  Un client oAuth2 autorisé
   */
  calendarIdFromName(gapi,name) {
    return new Promise( (resolve,reject) => {
      //const calendar = google.calendar({version: 'v3', auth});
      // console.log('ok calendarIdFromName')
      // console.log(gapi)
      gapi.client.calendar.calendarList.list({}).then( res => {
        // if (err) reject('The API returned an error: ' + err);
        const calendars = res.result.items;
        // console.log(calendars);
        calendars.forEach( cal => {
          // console.log(cal)
          if(cal.summary === name){
            // console.log(cal.id)
            resolve(cal.id)
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
   * @param {google.auth.OAuth2} auth Un client oAuth2 autorisé
   */
  getEvents(gapi,calId,start,end){
    return new Promise( (resolve,reject) => {
      //const calendar = google.calendar({version: 'v3', auth});
      // console.log('ok getEvents, calId:', calId);
      gapi.client.calendar.events.list(
        {
          calendarId:calId,
          timeMin:start.toISOString(),
          timeMax:end.toISOString()
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
   * Obtient les employés présents dans le calendrier entre deux dates
   * @param {Date} start Début de la période du calendrier
   * @param {Date} end Fin de la période du calendrier
   * @returns {Promise}
   */
  getEmployes(gapi,start,end){
    return new Promise( (resolve,reject) => {
      // console.log('ok getEmployes')
      // let oAuth = this.getOAuthClient();
      let nomCalendrier = 'Mains-d\'oeuvre';
      let calIdProm = this.calendarIdFromName(gapi,nomCalendrier);
      calIdProm.then( id => {
        // console.log(id)
        resolve(this.getEvents(gapi,id,start,end))
      }).catch( (reason) => reject(reason) );
    });
  },

  /**
   * Retourne tous les employés présents dans le calendrier entre deux dates sans doublon
   * et de façon dissociée pour les "employés double" (pe: JEAN-CLAUDE + BENOIT)
   * 
   * @param {Date} start 
   * @param {Date} end 
   * @returns {Set}
   */
  getEmployesDistincts(gapi,start,end){
    return new Promise( (resolve,reject) => {
      // console.log('ok getEmployesDistincts');
      
      let ret = new Set();
      let employesProm = this.getEmployes(gapi,start,end);
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
        }).then( () => resolve(ret) );
    });
  },
  /**
   * Renvoie les événements des calendriers des travaux
   * @param {google.client} gapi 
   * @param {Date} start 
   * @param {Date} end 
   */
  getPlanedEvents(gapi,start,end){
    return new Promise( (resolve,reject) => {
      let nomCalendrier = 'Chantiers';
      let calIdProm = this.calendarIdFromName(gapi,nomCalendrier);
      calIdProm.then( id => {
        resolve(this.getEvents(gapi,id,start,end))
      }).catch( (reason) => reject(reason) );
    });
  }
};

export default CalendarTools; 
