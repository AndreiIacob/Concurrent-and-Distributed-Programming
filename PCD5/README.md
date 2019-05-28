# This is an attempt at integrating contracts into CSBUI

csbui-ledger stores data about the downloads that occur in csbui-hybrid-app

To run it Node.js and PostgreSQL must be installed and configured. It currently has the following configuration:

user: 'postgres',
host: '127.0.0.1',
database: 'csbuiledger',
port: '5432'

Either PostgreSQL should be configured the some or the index.js file should be modified.
After installing PostgreSQL run `npm install` and `node index.js`

To run csbui run `npm install` and `npm run start-web`

csbui-hybrid-app is a modification of https://github.com/PrivateSky/csbui/tree/master/csb-hybrid-app
Adding the ability to store contracts.

Two apps were created in public/apps/csb and the two existing ones were modified
src\components\Modal\Popups\ContractForm.js was created and src\store\actions.js was modified to add the contracts button.