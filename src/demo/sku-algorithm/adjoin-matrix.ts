export type AdjoinType = Array<string>;

export default class AdjoinMatrix {
	vertex: AdjoinType;
	quantity: number;
	adjoinArray: Array<number>;
	constructor(vertex) {
		this.vertex = vertex;
		this.quantity = this.vertex.length;
		this.adjoinArray = [];
		this.init();
	}
	//初始化数组
	init() {
		this.adjoinArray = Array(this.quantity * this.quantity).fill(0);
	}
	/**
	 * 传入一个顶点，和当前顶点可达的顶点数组，将对应位置置为1
	 * @param id
	 * @param sides
	 */
	setAdjioinVertexs(id: string, sides: AdjoinType) {
		const pIndex = this.vertex.indexOf(id);
		sides.forEach(item => {
			const index = this.vertex.indexOf(item);
			this.adjoinArray[pIndex * this.quantity + index] = 1;
		});
	}
	/**
	 * 传入顶点的值，获取顶点的列
	 * @param id
	 */
	getVertexCol(id: string) {
		const index = this.vertex.indexOf(id);
		const col: Array<number> = [];
		this.vertex.forEach((item, pIndex) => {
			col.push(this.adjoinArray[index + this.quantity * pIndex]);
		});
		return col;
    }
    /**
     * 传入一个顶点数组，求出该数组所有顶点的列的和
     * @param params 
     */
	getColSum(params: AdjoinType) {
		const paramsVertex = params.map(id => this.getVertexCol(id));
        const paramsVertexSum: Array<number> = [];
        this.vertex.forEach((item,index)=> {
            const rowtotal = paramsVertex.map(value=> value[index]).reduce((total,current)=>{
                total += current || 0;
                return total;
            }, 0)
            paramsVertexSum.push(rowtotal)
        })
        return paramsVertexSum;
    }
    /**
     * 传入一个顶点数组，求出并集
     * @param params 
     */
    getCollection(params: AdjoinType) {
        const paramsColSum = this.getColSum(params)
        let collections: AdjoinType = []
        paramsColSum.forEach((item,index)=> {
            if(item && this.vertex[index]) {
                collections.push(this.vertex[index])
            }
            return collections;
        })
    }
    /**
     * 传入顶点数组，求出交集
     * @param params 
     */
    getUnions(params: AdjoinType) {
        const paramsColSum = this.getColSum(params);
        let unions:AdjoinType = [];
        paramsColSum.forEach((item,index)=> {
            if(item >= params.length && this.vertex[index]) {
                unions.push(this.vertex[index])
            }
        })
        return unions
    }
}
