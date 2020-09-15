 
// Angular Modules
import { Injectable } from '@angular/core';
// Application Classes
import { UrlBuilder } from '../classes/url-builder';

import { QueryStringParameters } from '../classes/query-string-parameters';
// Application Constants
import { Constants } from '../../config/constants';


@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {

  constructor(private constants: Constants) { }
  
   /* #region URL CREATOR */
  // URL
  private createUrl(    
    action: string, 
    isMockAPI: boolean = false
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,action);
    return urlBuilder.toString();
  }  

 
  
  // URL WITH QUERY PARAMS
  private createUrlWithQueryParameters(
    action: string, 
    queryStringHandler?: 
      (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT, 
      action
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }
  
  // URL WITH PATH VARIABLES
  private createUrlWithPathVariables(
    action: string, 
    pathVariables: any[] = []
  ): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl +=
          `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,  
      `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.toString();
  }
  /* #endregion */

  public getPointsEndpoint(path): string {

    var url= this.createUrl(path);
    return url;
  }

}
