export interface IUser {
    adrs: string[],
    birth?: string[],
    date: string,
    id: string,
    level: string,
    mileage: string,
    mobile: string[],
    name: string,
    phone?: string[],
    pswd: string,
    salt: string,
    email: string,
}

interface PColor {
    name: string,
    code: string,
}

export interface IProduct {
    category: string[],
    color: string[],
    delivery: string,
    id: string,
    like: string,
    name: string,
    price: string,
    size: string[],
    some_desc: string,
}

interface PSubOption {
    name: string,
    num: string,
}

interface PSockInfo {
    name: string,
    sub_option1: PSubOption,
    sub_option2?: PSubOption,
    sub_option3?: PSubOption,
}

export interface IStock {
    [key: string]: PSockInfo,
}


interface POrderProductInfo {
    coupon: string,
    id: string,
    mileage: string,
    name: string,
    num: string,
    option?: string,
    price: string,
    thumb_src: string,
}

export interface IOrder {
    date: string,
    key: string,
    main_key: string,
    order_num: string,
    product_info: POrderProductInfo,
    shipping: string,
}

interface PPayInfo {
    del_pay: string,
    get_mileage: string,
    is_pay: boolean,
    pay_price: string,
    total_price: string,
    sale: string,
    type: string,
    use_mileage: string,
}

interface PShippingInfo {
    adrs: string[],
    email: string,
    mobile: string[],
    msg: string,
    name: string,
}

export interface IDetailOrder {
    date: string,
    order_num: string,
    pay_info: PPayInfo,
    product_list: string[],
    shipping_info: PShippingInfo,
}

export interface IMileage {
    date: string,
    order: string,
    order_key: string,
    state: string,
    total_mileage: string,
    type: string,
    use_mileage: string,
}

export interface ICart {
    delicery: string,
    id: string,
    key: string,
    name: string,
    num: string,
    option?: string,
    price: string,
    thumb_src: string,
}

export interface IBoard {
    category: string,
    content: string,
    date: string,
    hits: string,
    id: string,
    num: string,
    product_info?: {
        id: string,
        name: string,
    },
    pswd: string,
    title: string,
    type: string,
    user_info: {
        id: string,
        key: string,
        name: string,
    }
}

export interface IComment {
    comment: string,
    date: string,
    key: string,
    name: string,
    user_key: string,
}

export interface IFile {
    name: string,
    url: string,
}