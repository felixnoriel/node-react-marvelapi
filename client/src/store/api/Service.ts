import AbstractService from "./AbstractService";

export default class Service extends AbstractService {
  fetchList(entityType: string, searchText?: string): Promise<any> {
    const hasSearchText =
      searchText && searchText != "" ? `&searchText=${searchText}` : "";
    return this.apiClient
      .makeRequest({
        url: `/marvel/${entityType}?limit=20${hasSearchText}`,
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
