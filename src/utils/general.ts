export function groupByArray(xs: any, key: any) {
    return xs.reduce(function (rv: any, x: any) {
        let v = key instanceof Function ? key(x) : x[key];
        let el = rv.find((r: any) => r && r.key === v);

        if (el) {
            el.values.push(x);
        } else {
            rv.push({ key: v, values: [x] });
        }

        return rv;
    }, []);
} 