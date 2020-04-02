import { HttpModule, Response, RequestHeaders } from "./HttpModule";
export type ResourceName = 'Patient';
export class FHIRClient {
   private httpModule: HttpModule;
   private baseUrl: string;
   private authtoken?: string;
   constructor(url: string, httpModule: HttpModule){
      this.httpModule = httpModule;
      this.baseUrl = url;
   }
   read(content: {type: ResourceName, id: string }): Promise<any>{
      return this.httpModule.request({
         url: this.baseUrl + '/' + content.type + '/' + content.id,
         method: "GET",
         headers: createFHIRHeaders(this.authtoken)
      }).then(function(response: Response){
         return response.content?.toJSON();
      });
   }
   setAuthToken(authtoken: string) {
      this.authtoken = authtoken;
   }
}

function createFHIRHeaders(authtoken?: string): RequestHeaders {
   let headers: RequestHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/fhir+json; fhirVersion=4.0"
   }; 
   if(authtoken){
      headers["Authorization"] = "Bearer " + authtoken;
   }

   return headers;
}