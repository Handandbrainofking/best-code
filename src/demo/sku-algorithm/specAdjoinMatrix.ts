import AdjoinMatrix from './adjoin-matrix';
import { AdjoinType } from './adjoin-matrix';
import {
	SpecCategoryType,
	CommoditySpecsType
} from './redux/reducer/spec-reducer';


export default class SpecAdjoinMatrix extends AdjoinMatrix {
    specList: Array<CommoditySpecsType>
    specCombinationList: Array<SpecCategoryType>

    constructor(specList: Array<CommoditySpecsType>, specCombinationList:Array<SpecCategoryType>) {
        super(specList.reduce((total:AdjoinType, current) => [...total,...current.list],[]))
        this.specList = specList;
        this.specCombinationList = specCombinationList;

        //根据可选规格列表矩阵创建
        this.initSpec();
    }

    initSpec() {
        this.specCombinationList.forEach((item)=> {
            this.fillInSpec(item.specs)
        })
    }
    getSpecscOptions(params:AdjoinType) {
        let specOptionCanchoose: AdjoinType = [];
        if(params.some(Boolean)) {
            specOptionCanchoose = this.getUnions(params.filter(Boolean))
        } else {
            specOptionCanchoose = this.getCollection(this.vertex)

        }
        return specOptionCanchoose;
    }
    /**
     * 填写邻接举证的值
     * @param params 
     */
    fillInSpec(params: AdjoinType) {
        params.forEach(param = > {
            this.setAdjoinVertexs(param, params)
        })
    }


}
