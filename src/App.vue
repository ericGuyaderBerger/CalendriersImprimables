<template>
  <div id="app" class="container">
    <h1>
      <i class="fa fa-calendar text-danger"></i>
      Roche &amp; Fils - Calendriers imprimables
    </h1>
    <Selection />
    <PrintableCalendars :salaries="employes" debut="2018-07-09" fin="2018-07-14" />
  </div>
</template>

<script>
import PrintableCalendars from './components/PrintableCalendars.vue'
import Selection from './components/Selection.vue'
// import CalendarTools from './calendars.js'

export default {
  name: 'app',
  components: {
    Selection,
    PrintableCalendars
  },
  data(){
    // let employes = []
    // let taches = {}
    // this.$getGapiClient()
    //   .then(gapi => {
    //     // console.log(gapi)
    //     gapi.auth2.getAuthInstance().signIn().then( () => {
    //       CalendarTools
    //         // .getEmployesDistincts(gapi,new Date('2018-07-16'),new Date('2018-07-20'))
    //         .getPlanedEvents(gapi,new Date('2018-07-16'),new Date('2018-07-20'))
    //         .then( distEmps => {
    //           // console.log( distEmps )
    //           employes = distEmps
    //           taches =  distEmps
    //         })
    //     })
    //   })
    //   .catch( err => console.log(err) )
    let employes = [{nom:"YARECK"},{nom:"JOEL"},{nom:"JEAN-CLAUDE"},{nom:"BENOIT"},{nom:"BENJAMIN"},{nom:"PHILIPPE"},{nom:"DISANT"},{nom:"PHIL"}];
     let taches = [
    {
    "kind": "calendar#event",
    "etag": "\"3062947272114000\"",
    "id": "3u2qt8q4vaj6arfhgls7rtqcfm",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=M3UycXQ4cTR2YWo2YXJmaGdsczdydHFjZm1fMjAxODA3MTZUMDEwMDAwWiBqZTZwN2VscWlkYTBoYXE5ZHYxMjY0Zm85Y0Bn",
    "created": "2018-07-13T09:20:21.000Z",
    "updated": "2018-07-13T09:20:36.057Z",
    "summary": "F. MISTRAL",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T03:00:00+02:00",
      "timeZone": "Europe/Paris"
    },
    "end": {
      "dateTime": "2018-07-16T03:15:00+02:00",
      "timeZone": "Europe/Paris"
    },
    "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=MO"
    ],
    "iCalUID": "3u2qt8q4vaj6arfhgls7rtqcfm@google.com",
    "sequence": 1,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062947426440000\"",
    "id": "2jjfr7vb87elf20c9p7vrnklto",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=MmpqZnI3dmI4N2VsZjIwYzlwN3ZybmtsdG9fMjAxODA3MTZUMDEzMDAwWiBqZTZwN2VscWlkYTBoYXE5ZHYxMjY0Zm85Y0Bn",
    "created": "2018-07-13T09:21:53.000Z",
    "updated": "2018-07-13T09:21:53.220Z",
    "summary": "VERDIER Hall",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T03:30:00+02:00",
      "timeZone": "Europe/Paris"
    },
    "end": {
      "dateTime": "2018-07-16T03:45:00+02:00",
      "timeZone": "Europe/Paris"
    },
    "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=MO"
    ],
    "iCalUID": "2jjfr7vb87elf20c9p7vrnklto@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062947764134000\"",
    "id": "3u2qt8q4vaj6arfhgls7rtqcfm_20180716T010000Z",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=M3UycXQ4cTR2YWo2YXJmaGdsczdydHFjZm1fMjAxODA3MTZUMDEwMDAwWiBqZTZwN2VscWlkYTBoYXE5ZHYxMjY0Zm85Y0Bn",
    "created": "2018-07-13T09:20:21.000Z",
    "updated": "2018-07-13T09:24:42.067Z",
    "summary": "F. MISTRAL",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T02:00:00+02:00",
      "timeZone": "Europe/Paris"
    },
    "end": {
      "dateTime": "2018-07-16T02:15:00+02:00",
      "timeZone": "Europe/Paris"
    },
    "recurringEventId": "3u2qt8q4vaj6arfhgls7rtqcfm",
    "originalStartTime": {
      "dateTime": "2018-07-16T03:00:00+02:00",
      "timeZone": "Europe/Paris"
    },
    "iCalUID": "3u2qt8q4vaj6arfhgls7rtqcfm@google.com",
    "sequence": 2,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062947771802000\"",
    "id": "2jjfr7vb87elf20c9p7vrnklto_20180716T013000Z",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=MmpqZnI3dmI4N2VsZjIwYzlwN3ZybmtsdG9fMjAxODA3MTZUMDEzMDAwWiBqZTZwN2VscWlkYTBoYXE5ZHYxMjY0Zm85Y0Bn",
    "created": "2018-07-13T09:21:53.000Z",
    "updated": "2018-07-13T09:24:45.901Z",
    "summary": "VERDIER Hall",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T02:30:00+02:00",
      "timeZone": "Europe/Paris"
    },
    "end": {
      "dateTime": "2018-07-16T02:45:00+02:00",
      "timeZone": "Europe/Paris"
    },
    "recurringEventId": "2jjfr7vb87elf20c9p7vrnklto",
    "originalStartTime": {
      "dateTime": "2018-07-16T03:30:00+02:00",
      "timeZone": "Europe/Paris"
    },
    "iCalUID": "2jjfr7vb87elf20c9p7vrnklto@google.com",
    "sequence": 1,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062947938452000\"",
    "id": "4m024ps3soh7j527c0o213lfot",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=NG0wMjRwczNzb2g3ajUyN2MwbzIxM2xmb3QgamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:26:09.000Z",
    "updated": "2018-07-13T09:26:09.226Z",
    "summary": "FRISQUET",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T05:30:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T05:45:00+02:00"
    },
    "iCalUID": "4m024ps3soh7j527c0o213lfot@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062948010206000\"",
    "id": "1cqhpjtjaiuala7u78i3hqm26g",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=MWNxaHBqdGphaXVhbGE3dTc4aTNocW0yNmcgamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:26:32.000Z",
    "updated": "2018-07-13T09:26:45.103Z",
    "summary": "EQUATION IMMOBILIER",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T05:45:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T06:00:00+02:00"
    },
    "iCalUID": "1cqhpjtjaiuala7u78i3hqm26g@google.com",
    "sequence": 0,
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062948055286000\"",
    "id": "3bf8q30iba1tfce8v9hhke8him",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=M2JmOHEzMGliYTF0ZmNlOHY5aGhrZThoaW0gamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:27:07.000Z",
    "updated": "2018-07-13T09:27:07.643Z",
    "summary": "P. LUMIERE",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T06:00:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T06:15:00+02:00"
    },
    "iCalUID": "3bf8q30iba1tfce8v9hhke8him@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062948120328000\"",
    "id": "4d17s1ea8t7hsd7us2slj06cjh",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=NGQxN3MxZWE4dDdoc2Q3dXMyc2xqMDZjamggamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:27:40.000Z",
    "updated": "2018-07-13T09:27:40.164Z",
    "summary": "SAGESSE MINIMES",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T06:15:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T06:30:00+02:00"
    },
    "iCalUID": "4d17s1ea8t7hsd7us2slj06cjh@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062948163598000\"",
    "id": "193u1unhi1epu3lje6eca0va5j",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=MTkzdTF1bmhpMWVwdTNsamU2ZWNhMHZhNWogamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:28:01.000Z",
    "updated": "2018-07-13T09:28:01.799Z",
    "summary": "COTEAUX TOULOUSAINS",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T06:30:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T06:45:00+02:00"
    },
    "iCalUID": "193u1unhi1epu3lje6eca0va5j@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062948223816000\"",
    "id": "6m80cp76g6m2r6jes95ces33m4",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=Nm04MGNwNzZnNm0ycjZqZXM5NWNlczMzbTQgamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:28:31.000Z",
    "updated": "2018-07-13T09:28:31.908Z",
    "summary": "DARQUIER N°9",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T07:30:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T07:45:00+02:00"
    },
    "iCalUID": "6m80cp76g6m2r6jes95ces33m4@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062948271964000\"",
    "id": "2rampv4q1e1hj2nqupd3cdvd6c",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=MnJhbXB2NHExZTFoajJucXVwZDNjZHZkNmMgamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:28:55.000Z",
    "updated": "2018-07-13T09:28:55.982Z",
    "summary": "PROCIVIS MAXI",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T07:45:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T08:00:00+02:00"
    },
    "iCalUID": "2rampv4q1e1hj2nqupd3cdvd6c@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062948309004000\"",
    "id": "09d4087brp7310gcf8no9sftpv",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=MDlkNDA4N2JycDczMTBnY2Y4bm85c2Z0cHYgamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:29:14.000Z",
    "updated": "2018-07-13T09:29:14.502Z",
    "summary": "VARSOVIE Hall",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T08:00:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T08:15:00+02:00"
    },
    "iCalUID": "09d4087brp7310gcf8no9sftpv@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062949322866000\"",
    "id": "6o3cbjakenjr7hbl4o2qghn7vr",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=Nm8zY2JqYWtlbmpyN2hibDRvMnFnaG43dnIgamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:37:41.000Z",
    "updated": "2018-07-13T09:37:41.433Z",
    "summary": "MPOSS",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T02:15:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T02:30:00+02:00"
    },
    "iCalUID": "6o3cbjakenjr7hbl4o2qghn7vr@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062949442622000\"",
    "id": "7qkltfj4m9fotmsgmrfhjs9ria",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=N3FrbHRmajRtOWZvdG1zZ21yZmhqczlyaWEgamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:38:41.000Z",
    "updated": "2018-07-13T09:38:41.311Z",
    "summary": "PHARMACIE PONTS JUMEAUX",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T09:30:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T09:45:00+02:00"
    },
    "iCalUID": "7qkltfj4m9fotmsgmrfhjs9ria@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062949521142000\"",
    "id": "6d5b4luj94iej6c0fqqfhq8gqu",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=NmQ1YjRsdWo5NGllajZjMGZxcWZocThncXUgamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:39:20.000Z",
    "updated": "2018-07-13T09:39:20.571Z",
    "summary": "CHABAUD / LE PRINCE",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T09:45:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T10:00:00+02:00"
    },
    "iCalUID": "6d5b4luj94iej6c0fqqfhq8gqu@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062949557116000\"",
    "id": "11623phrjter1tdroue3666pk5",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=MTE2MjNwaHJqdGVyMXRkcm91ZTM2NjZwazUgamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:39:38.000Z",
    "updated": "2018-07-13T09:39:38.558Z",
    "summary": "PRIMAVERA",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T10:00:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T10:15:00+02:00"
    },
    "iCalUID": "11623phrjter1tdroue3666pk5@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062949585070000\"",
    "id": "04enc81cptqiue5272031h6i7e",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=MDRlbmM4MWNwdHFpdWU1MjcyMDMxaDZpN2UgamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:39:52.000Z",
    "updated": "2018-07-13T09:39:52.535Z",
    "summary": "DIEUZAIDE",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T10:15:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T10:30:00+02:00"
    },
    "iCalUID": "04enc81cptqiue5272031h6i7e@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062949634558000\"",
    "id": "7sbmr7euolie0iut8fgsvvos9f",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=N3NibXI3ZXVvbGllMGl1dDhmZ3N2dm9zOWYgamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:40:17.000Z",
    "updated": "2018-07-13T09:40:17.279Z",
    "summary": "MATEOS",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T11:30:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T11:45:00+02:00"
    },
    "iCalUID": "7sbmr7euolie0iut8fgsvvos9f@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    },
    {
    "kind": "calendar#event",
    "etag": "\"3062949743132000\"",
    "id": "5c7ji46edvih5vcog6fbt7tfdo",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=NWM3amk0NmVkdmloNXZjb2c2ZmJ0N3RmZG8gamU2cDdlbHFpZGEwaGFxOWR2MTI2NGZvOWNAZw",
    "created": "2018-07-13T09:41:11.000Z",
    "updated": "2018-07-13T09:41:11.566Z",
    "summary": "PATRIMOINE DE FRANCE",
    "creator": {
      "email": "egb.test.2018.07.12@gmail.com"
    },
    "organizer": {
      "email": "je6p7elqida0haq9dv1264fo9c@group.calendar.google.com",
      "displayName": "Chantiers",
      "self": true
    },
    "start": {
      "dateTime": "2018-07-16T11:45:00+02:00"
    },
    "end": {
      "dateTime": "2018-07-16T12:00:00+02:00"
    },
    "iCalUID": "5c7ji46edvih5vcog6fbt7tfdo@google.com",
    "sequence": 0,
    "extendedProperties": {
      "private": {
      "everyoneDeclinedDismissed": "-1"
      }
    },
    "reminders": {
      "useDefault": true
    }
    }
  ]
  

    return {employes:employes,taches:taches}
  },
}
</script>

<style>

</style>
