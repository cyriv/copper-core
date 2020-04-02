export interface HttpModule {
    /**
     * Makes a generic http request using the provided options and returns a Response Object.
     * @param options An object that specifies various request options.
     */
    request(options: RequestOptions): Promise<Response>
}

/**
 * Provides options for the http requests.
 */
export interface RequestOptions {
    /**
     * Gets or sets the request url.
     */
    url: string;
  
    /**
     * Gets or sets the request method.
     */
    method: string;
  
    /**
     * Gets or sets the request headers in JSON format.
     */
    headers?: RequestHeaders;
  
    /**
     * Gets or sets the request body.
     */
    content?: string | FormData | ArrayBuffer;
  
    /**
     * Gets or sets the request timeout in milliseconds.
     */
    timeout?: number;
  
    /**
     * Gets or sets whether to *not* follow server's redirection responses.
     */
    redirect?: RequestRedirect;
  }
  export type RequestHeaders = { [key: string]: string };
/**
 * Response information from an HTTP-request.
 */
export interface Response {
    /**
     * Gets the response status code.
     */
    status: number;
  
    /**
     * Gets the response headers.
     */
    headers: Headers;
  
    /**
     * Gets the response content.
     */
    content?: HttpContent;
  }
  
  export type Headers = { [key: string]: string | string[] };
  
  /**
   * Encapsulates the content of an HttpResponse.
   */
  export interface HttpContent {
    /**
     * Gets the response body as raw data.
     */
    raw: any;
  
    /**
     * Gets the response body as ArrayBuffer
     */
    toArrayBuffer: () => ArrayBuffer;
  
    /**
     * Gets the response body as string.
     */
    toString: () => string;
  
    /**
     * Gets the response body as JSON object.
     */
    toJSON: () => object;
  }

