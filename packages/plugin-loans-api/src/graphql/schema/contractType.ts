export const types = () => `
  type ContractType {
    _id: String!
    code: String
    name: String
    description: String
    status: String
    number: String
    vacancy: Float
    lossPercent: Float
    lossCalcType: String
    useMargin: Boolean
    useSkipInterest: Boolean
    useDebt: Boolean
    useManualNumbering: Boolean
    useFee: Boolean
    leaseType: String
    commitmentInterest: Float
    createdAt: Date
    productCategoryIds: [String]
    productId: String
    config: JSON
    

    productCategories: [ProductCategory]
    currency:String
    productType:String
    savingPlusLoanInterest:Float
    savingUpperPercent:Float
    usePrePayment:Boolean
    invoiceDay:String
    customFieldsData: JSON
  }

  type ContractTypesListResponse {
    list: [ContractType],
    totalCount: Float,
  }
`;

const queryParams = `
  page: Int
  perPage: Int
  ids: [String]
  searchValue: String
  sortField: String
  sortDirection: Int
  productId:String
  productType:String
  leaseType:String
`;

export const queries = `
  contractTypesMain(${queryParams}): ContractTypesListResponse
  contractTypes(${queryParams}): [ContractType]
  contractTypeDetail(_id: String!): ContractType
`;

const commonFields = `
  code: String
  name: String
  description: String
  status: String
  number: String
  vacancy: Float
  lossPercent: Float 
  lossCalcType: String
  useMargin: Boolean
  useSkipInterest: Boolean
  useManualNumbering: Boolean
  useDebt: Boolean
  useFee: Boolean
  leaseType: String
  commitmentInterest: Float
  createdAt: Date
  productCategoryIds: [String]
  productId: String
  config: JSON
  currency:String
  productType:String
  savingPlusLoanInterest:Float
  savingUpperPercent:Float
  usePrePayment:Boolean
  invoiceDay:String
  customFieldsData: JSON
`;

export const mutations = `
  contractTypesAdd(${commonFields}): ContractType
  contractTypesEdit(_id: String!, ${commonFields}): ContractType
  contractTypesRemove(contractTypeIds: [String]): [String]
`;
