// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

const listInstitutionsData = {
  data: [
    {
      active_on_website: true,
      banking_account: {
        account_number: '1234-5',
        bank_agency: '0001',
        bank_code: '341',
      },
      document: '00.000.000/0001-91',
      file: {
        file_name: '329ea584-5ba2-41a2-bb86-e4e99757606a__Avenues.png',
        id: '329ea584-5ba2-41a2-bb86-e4e99757606a',
        mime: 'image/png',
        path: 'https://prd-uploads-bucket.s3.amazonaws.com/uploads/329ea584-5ba2-41a2-bb86-e4e99757606a__Avenues.png?AWSAccessKeyId=ASIARIUSMMBANXSYTUAP&Signature=HajAEulP87PLcU9tWKerjvwEDxY%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXNhLWVhc3QtMSJHMEUCIQDdvmjEPPh81uuLlN2nz%2Fjm15EPOutehJopFQygZ9akygIgKXldzNYoFQnCY%2B1YNQ%2BH%2B56jIRRWbLVVGurfb3Z8stkqiQMI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwwODcyODAwODMwMDgiDKC%2B7eH7hZAUSKLIfCrdAuXtcKYkcJNM%2BT7p%2BvQRuy9m%2F2Gikc2ta%2F2EqHS8NPNZr9kNxhLryejZFFAIRZNN%2BuMZkJB02LYpsJ84CmqoEqeXB2Pgqt%2Fy3uwPxj8AAhT7kzKa0Tg1gi19DfRxU7dAuEIKPfpTFtXvxpVfyHGGg51DHMYxBYCts8%2BJMxuzZjwbdd9TRUDA7vqN53B0xjFgnAZ4p%2Bnt9i%2BbfwWkN%2B9ZK%2FcFODJ%2FYsp%2BdQ%2BGrZyMylrMUZXtK7S9I2fsNNjLd%2BCSyb3gr1AWuz%2FbvXeqvSrDDTeKJg2PyWdFds7byul2tyDWftTw2%2B8%2F9MOkdVxT1pxh5VQm2q0NXFL5mUGxHmrQicVA6C25qV29ka%2F3kBki2odGa0O3%2BnAJy5Q8SRiSTLJecU1f7y9UW4OBde0dWNViIcO6VnLKFA2XVklVPlma1%2FB5HKqFOtCF6d9ckhfDp2WOlan3SVqUoKl31Qc5I68w4NXhrwY6ngG5WXKpuLV%2FBeYxid6VTYY44eBIv8YLPTArgZQORaAGcNKnEzVo0hPaKWqPIXmDKJI6lGWmuqOxTtZU9bn1GPd1NxTnkUxEeTjVVkgxXCsHuO15a8mldAwyId613UCtpntFtUyy5Zg5qdPdlqDY50W8EiH1%2BCerX1oi4DBdxRLs35Jr0ZJtX8I1tuTAuEIozEd%2BifVet7cs9R%2B7EcVT7g%3D%3D&Expires=1710779710',
        size_bytes: 0,
      },
      file_id: '329ea584-5ba2-41a2-bb86-e4e99757606a',
      has_banking_account: true,
      id: 'da6f5cbe-bbb7-11ee-a4e4-33bc1556a1ee',
      inserted_at: 'Mon, 15 Jan 2024 22:54:19 GMT',
      is_deleted: false,
      name: 'Avenues',
      ranking: '80',
      updated_at: 'Sun, 18 Feb 2024 17:42:35 GMT',
    },
    {
      active_on_website: false,
      banking_account: {
        account_number: '1234-5',
        bank_agency: '0001',
        bank_code: '341',
      },
      document: '00.000.000/0001-91',
      file: {
        file_name: '329ea584-5ba2-41a2-bb86-e4e99757606a__Avenues.png',
        id: '329ea584-5ba2-41a2-bb86-e4e99757606a',
        mime: 'image/png',
        path: 'https://prd-uploads-bucket.s3.amazonaws.com/uploads/329ea584-5ba2-41a2-bb86-e4e99757606a__Avenues.png?AWSAccessKeyId=ASIARIUSMMBANXSYTUAP&Signature=HajAEulP87PLcU9tWKerjvwEDxY%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXNhLWVhc3QtMSJHMEUCIQDdvmjEPPh81uuLlN2nz%2Fjm15EPOutehJopFQygZ9akygIgKXldzNYoFQnCY%2B1YNQ%2BH%2B56jIRRWbLVVGurfb3Z8stkqiQMI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwwODcyODAwODMwMDgiDKC%2B7eH7hZAUSKLIfCrdAuXtcKYkcJNM%2BT7p%2BvQRuy9m%2F2Gikc2ta%2F2EqHS8NPNZr9kNxhLryejZFFAIRZNN%2BuMZkJB02LYpsJ84CmqoEqeXB2Pgqt%2Fy3uwPxj8AAhT7kzKa0Tg1gi19DfRxU7dAuEIKPfpTFtXvxpVfyHGGg51DHMYxBYCts8%2BJMxuzZjwbdd9TRUDA7vqN53B0xjFgnAZ4p%2Bnt9i%2BbfwWkN%2B9ZK%2FcFODJ%2FYsp%2BdQ%2BGrZyMylrMUZXtK7S9I2fsNNjLd%2BCSyb3gr1AWuz%2FbvXeqvSrDDTeKJg2PyWdFds7byul2tyDWftTw2%2B8%2F9MOkdVxT1pxh5VQm2q0NXFL5mUGxHmrQicVA6C25qV29ka%2F3kBki2odGa0O3%2BnAJy5Q8SRiSTLJecU1f7y9UW4OBde0dWNViIcO6VnLKFA2XVklVPlma1%2FB5HKqFOtCF6d9ckhfDp2WOlan3SVqUoKl31Qc5I68w4NXhrwY6ngG5WXKpuLV%2FBeYxid6VTYY44eBIv8YLPTArgZQORaAGcNKnEzVo0hPaKWqPIXmDKJI6lGWmuqOxTtZU9bn1GPd1NxTnkUxEeTjVVkgxXCsHuO15a8mldAwyId613UCtpntFtUyy5Zg5qdPdlqDY50W8EiH1%2BCerX1oi4DBdxRLs35Jr0ZJtX8I1tuTAuEIozEd%2BifVet7cs9R%2B7EcVT7g%3D%3D&Expires=1710779710',
        size_bytes: 0,
      },
      file_id: '329ea584-5ba2-41a2-bb86-e4e99757606a',
      has_banking_account: true,
      id: 'asd123123-bbb7-11ee-a4e4-33bc1556a1ee',
      inserted_at: 'Mon, 15 Jan 2024 22:54:19 GMT',
      is_deleted: false,
      name: 'Avenues 2',
      ranking: '80',
      updated_at: 'Sun, 18 Feb 2024 17:42:35 GMT',
    },
  ],
}

export const listInstitutions = http.get(
  `${variables.API_BASE_URL}api/admin/institutions`,
  () => HttpResponse.json({
    status: 200,
    ...listInstitutionsData,
  })
)
