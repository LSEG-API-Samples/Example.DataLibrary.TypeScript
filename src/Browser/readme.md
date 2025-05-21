# Using the Library in a Web Browser

LSEG provides a browser build for the LD Library which is available in the NodeJS package **@lsegroup/data**. The JavaScript *datalib.js* file for browser can be found at *@lsegroup\data\build\browser*. This module is not separately deployed on the CDN. A web page can reference this script and import all the provided modules, as shown in the accompanying sample.


### Limitations
Using the library within a web browser has following limitations:
1. The Library can only be used with a *Desktop Session*, on a machine running *LSEG Workspace*. The CORS restrictions do not allow *Platform Session* connections. 
2. The browser does not have access to the local filesystem. Due to this, library is unable to read the API proxy port and tries to connect default port 9000 on the localhost. A workaround is to either manually provide the Proxy port or as the provided example shows, try a range of ports.