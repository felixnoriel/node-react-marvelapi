import AbstractService from "./AbstractService";

export default class Service extends AbstractService {
  fetchList(entityType: string): Promise<any> {
    return this.apiClient
      .makeRequest({
        url: `/marvel/${entityType}`,
        method: "GET"
      })
      .then(res => res.data.data.results as Array<any>);
  }

  fetchObject(entityType: string, entityId: number): Promise<any> {
    return this.apiClient
      .makeRequest({
        url: `/marvel/${entityType}/${entityId}`,
        method: "GET"
      })
      .then(res => res.data.results as any);
  }
}
