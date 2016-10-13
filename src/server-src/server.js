'use strict';

let express = require("express");
let path = require('path');
let yahooFinance = require('yahoo-finance');
const app = express();

const useViewsEngine = () => {
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'jsx');
  app.engine('jsx', require('express-react-views').createEngine());
};

const useJsonBodyParser = () => {
  var bodyParser = require('body-parser');
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
};

const useStaticFolder = (folderName) => {
  app.use(express.static(folderName));
};

const init = () => {
  useViewsEngine();
  useJsonBodyParser();
  useStaticFolder('dist');

  var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
  });
};

init();

app.get('/',  (req, res) => {
  res.render('index');
  res.status(200);
});


app.post('/saveFinancialModel', (req, res) => {
  console.log('Server API: saveFinancialModel');
  console.log(req.body);
  res.end();
});

app.post('/bo/api/s3/domain/services/domainGet', (req, res) => {
  console.log('Server API: getDomainData');
  res.header('Content-Type','text/xml');
  let xml = '<serviceResponse> <command>domainGet</command> <clientRef/> <status> <statusCode>1000</statusCode> <statusDescription>Success</statusDescription> </status> <response> <domainGet> <domain> <userId/> <domainInfo> <domainName>idoidoido.info</domainName> <productId>33392005</productId> <domainStatus>Active</domainStatus> <startDate>07-Jun-2016</startDate> <expiryDate>07-Jun-2017</expiryDate> <autoRenew>Off</autoRenew> <registrarLock>On</registrarLock> <privacy>Off</privacy> <password>krrpmf1n</password> <expiryDateTime>2017-06-07T00:00:00-04:00</expiryDateTime> </domainInfo> <contacts> <contact> <contactId>38913099</contactId> <title/> <firstName>Ido</firstName> <lastName>Seter</lastName> <companyName/> <companyPositionHeld/> <emailAddress>idose@wix.com</emailAddress> <telephoneNumber>+972.35544455</telephoneNumber> <faxNumber/> <addressLine1>namal 40</addressLine1> <addressLine2/> <city>Tel Aviv</city> <province/> <state/> <postalCode>29100</postalCode> <countryCode>IL</countryCode> <contactType>Administration</contactType> </contact> <contact> <contactId>38913099</contactId> <title/> <firstName>Ido</firstName> <lastName>Seter</lastName> <companyName/> <companyPositionHeld/> <emailAddress>idose@wix.com</emailAddress> <telephoneNumber>+972.35544455</telephoneNumber> <faxNumber/> <addressLine1>namal 40</addressLine1> <addressLine2/> <city>Tel Aviv</city> <province/> <state/> <postalCode>29100</postalCode> <countryCode>IL</countryCode> <contactType>Registration</contactType> </contact> <contact> <contactId>38913099</contactId> <title/> <firstName>Ido</firstName> <lastName>Seter</lastName> <companyName/> <companyPositionHeld/> <emailAddress>idose@wix.com</emailAddress> <telephoneNumber>+972.35544455</telephoneNumber> <faxNumber/> <addressLine1>namal 40</addressLine1> <addressLine2/> <city>Tel Aviv</city> <province/> <state/> <postalCode>29100</postalCode> <countryCode>IL</countryCode> <contactType>Technical</contactType> </contact> <contact> <contactId>26347099</contactId> <title/> <firstName>Wix</firstName> <lastName>Support</lastName> <companyName>wix.com</companyName> <companyPositionHeld/> <emailAddress>support@wix.com</emailAddress> <telephoneNumber>+1.8006000949</telephoneNumber> <faxNumber/> <addressLine1>2601 Mission St</addressLine1> <addressLine2>3rd Fl</addressLine2> <city>San Francisco</city> <province/> <state>CA</state> <postalCode>94110</postalCode> <countryCode>US</countryCode> <contactType>Billing</contactType> </contact> </contacts> <nameServers> <nameServer> <nsType>Primary</nsType> <nsName>ns4.wixdns.net</nsName> <nsIpAddress/> </nameServer> <nameServer> <nsType>Secondary</nsType> <nsName>ns5.wixdns.net</nsName> <nsIpAddress/> </nameServer> </nameServers> <zones/> <services/> <extraAttributes/> </domain> <currentPage>1</currentPage> <totalPages>1</totalPages> <recordCount>1</recordCount> </domainGet> </response> <statistics> <server>JAX4BHWEB02</server> </statistics> </serviceResponse>';
  setTimeout(() => { res.send(xml); }, 400);
});

app.post('/bo/api/s3/domain/services/domainTransferGet', (req, res) => {
  console.log('Server API: getDomainTransferData');
  res.header('Content-Type','text/xml');
  let xml = '<serviceResponse> <command>domainTransferGet</command> <clientRef/> <status> <statusCode>1000</statusCode> <statusDescription>Success</statusDescription> </status> <response> <domains/> </response> <statistics> <server>JAX4BHWEB02</server> <execution> <timeSpan>00:00:00.028</timeSpan> <startDateTime>8/21/2016 2:47:48 AM</startDateTime> <endDateTime>8/21/2016 2:47:48 AM</endDateTime> </execution> </statistics> </serviceResponse>';
  setTimeout(() => { res.send(xml); }, 400);
});

app.post('/bo/api/s3/domain/services/registryCheck', (req, res) => {
  console.log('Server API: getRegistryCheckData');
  res.header('Content-Type','text/xml');
  let xml = '<serviceResponse> <command>registryCheck</command> <clientRef/> <status> <statusCode>1000</statusCode> <statusDescription>Success</statusDescription> </status> <response> <name>idoidoido.info</name> <createTime>06/07/2016 08:55:53</createTime> <expiryTime>06/07/2017 08:55:53</expiryTime> <updateTime>08/06/2016 04:31:29</updateTime> <nameServer>ns4.wixdns.net</nameServer> <nameServer>ns5.wixdns.net</nameServer> <registryStatus>clientTransferProhibited</registryStatus> </response> <statistics> <server>JAX4BHWEB02</server> <execution> <timeSpan>00:00:00.900</timeSpan> <startDateTime>8/21/2016 2:50:22 AM</startDateTime> <endDateTime>8/21/2016 2:50:22 AM</endDateTime> </execution> </statistics> </serviceResponse>';
  setTimeout(() => { res.send(xml); }, 400);
});

app.post('/bo/api/s3/domain/services/getWixDomain', (req, res) => {
  console.log('Server API: getPremiumDomainData');
  res.header('Content-Type','application/json');
  let json = '{"wixUserGuid":"8dc319c5-9335-4fd0-9758-22f6d1bcb6af","registerDotComStatus":"Active","siteId":null,"mgmType":"DOMAIN_MGMT_REGISTRATION","domainExpirationDate":1496793600000,"hasPremiums":true,"nameserver1":"ns5.wixdns.net","nameserver2":"ns4.wixdns.net","wwwRecordCName":"www210.wixdns.net","published":false}';
  setTimeout(() => { res.send(json); }, 400);
});


app.get('/getStockHistoricalData', (req, res) => {
  console.log('Server API: getStockHistoricalData');
  res.header("Access-Control-Allow-Credentials", true);

  yahooFinance.historical({
    symbol: 'WIX',
    from: '2015-01-01',
    to: '2015-12-31'
    // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  }, (err, quotes) => {
    if (err) {
      throw new Error('Failed to fetch data from provider: ' + err);
    }
    res.json(quotes);
  });
});
