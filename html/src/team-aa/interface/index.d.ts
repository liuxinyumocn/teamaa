interface Results {
    num: number;
    recordNum: number;
    totalFee: number;
    avgFee: number;
    datas: EvbodyData[];
}
interface EvbodyData {
    recordNum: number;
    totalFee: number;
    relatedNum: number;
    transfer: TransferInfo[];
}
interface TransferInfo {
    to: string;
    cash: number;
}
