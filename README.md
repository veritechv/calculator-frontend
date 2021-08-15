**Introduction**

Welcome to the UI part of the Web Calculator project.

This project is a Single Page Application that gives face to the REST API built in the `calculator-backend` project.

**Requirements**

- Angular CLI 11
- Node 16

**Project Structure**

The code looks like this:

```
.
└── src
    ├── app
    │         ├── components                       <-- User Interface, this is what the user sees
    │         │         ├── calculator-services
    │         │         ├── confirmation-dialog
    │         │         ├── create-service-dialog
    │         │         ├── execute-service-dialog
    │         │         ├── home
    │         │         ├── information-dialog
    │         │         ├── login
    │         │         ├── menu
    │         │         ├── record-details-dialog
    │         │         ├── records
    │         │         ├── service-details-dialog
    │         │         ├── sign-up
    │         │         ├── user-details-dialog
    │         │         ├── user-profile-dialog
    │         │         └── users
    │         ├── guards                           <--- Restricts the user navigation
    │         ├── interceptor                      <--- Includes the JWT value in every request
    │         ├── model                            <--- DTOs
    │         └── service                          <--- Components that call the REST endpoints
    ├── assets
    └── environments
```

**Model**

The model classes are almost a duplicate of what we have in the backend project and they 
serve the same purpose, the only difference is that these classes don't have a database ID, just the UUID.

But the UUID is enough to identify any User, Record or Service in the application, and all the
CRUD operations are based on that.

This is definition for each class(copied from the backend docs):
- User. The person using the application, usually executing the services.
- Role. Type of user. It helps us to determine the functionality a user can use.
- User Status - This tell if the user can log in to the application.
- Service. The representation of the math operations
- Service Type. This is a list of service categories. We can have multiple services for the same catetory.
- Service Status. The status let us know if a user can execute it.
- Record. The holder of the execution data, that is our log.
- Record Status. A record can have one of two statuses, Active or Deleted.

These are additional classes:
- Configuration. A system configuration, like the default balance.
- PagingInfo. Holds the page number, page size and sorting field. It's sent to the backend to let it know how many elements we want back.

**Components**

The components directory has all the user interfaces that let us interact with the application.

This is a brief explanation of their purpose:
- Login. Login form with username and password fields.
- Sign Up. Sign up form with username, password and password verification field.
- Home. Main page shown after a successful login.
- Menu. Menu bar at the top of the page. Always visible.
- Calculator Services. Services available for the user.
- Records. List of user's records, or all records if the user is an admin.
- Users. List of all users registered in the applicaton. Only for admins.
- Dialogs
  - Record detail. Dialog form showing additional data for a record.
  - Service detail. Dialog form showing additional of a service.
  - Execute service. Dialog form from where the user can execute a service.
  - Create service. Dialog form that let the user register a new service.
  - User details. Dialog form showing user's information like balance, an status.
  - User profile. Dialog form showing user's information for the current logged user.


**Services**

This classes are the ones exchanging information between the components and the backend.
They encapsulate the HTTP requests sent to the REST api.

This is the list of services:
- AppSettings service retrieves configuration values of the app.
- Calculator service sends the execute requests.
- Configuration Records, Services and Users services encapsulate the CRUD requests to the backend.
- UserSession keeps track of the logged user.
- Login service requests the authentication or sign up of a user.


**Configuration**

The configuration of the application is held in three files:
- `app-setings.json` in the  `src/assests/` directory.
- `environment.ts` and `environment.prod.ts` in `src/environments`

The purpose of `app-settins.json` is to have configuration values related with the appication's functionality, while the `environment*.ts` files are meant to help with the building process.

**Interceptor**

The interceptor is in charge to append the `Authorization` header to every request, with the security token value.
This way we don't have to repeat this in every service.


**Installation**

The installation is fairly easy. We need to have installed:
- Angular CLI 11
- Node v16
- NPM(Node Package Manager). Usually this comes with Node.

Then from the project's root directory run
`>npm install`

and then
`>ng serve`


And that's it you should see the application at http://localhost:4200 .
Of course for this to work properly we need also the backend project up and running.


**Future work**
- Implement tests (BIG FAIL)
- Fix layout and looks
- Implement AppSettings service.
- Get rid of the app-settings.json file. This could be replaced.

