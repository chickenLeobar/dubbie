import * as qs from "querystring";

export class LinkCreator {
  static query(object: { [key: string]: any }) {
    return qs.stringify(object);
  }

  static valueToArray(val: string) {
    return val.split(",");
  }
  static toQuery(object: { [key: string]: string }, path = "/") {
    const slices = path.split("?");
    const prev = qs.parse(slices[1]);
    const isEmptyPrev = Object.keys(prev).length;
    if (isEmptyPrev) {
      Object.keys(object).forEach((key) => {
        const exist = prev[key];
        if (exist) {
          const prevValue = LinkCreator.valueToArray(
            exist as unknown as string
          );
          prevValue.push(object[key]);
          object[key] = prevValue.join(",");
        }
      });
    }
    let query = this.query(object);

    return slices[0] + "?" + query;
  }
}
