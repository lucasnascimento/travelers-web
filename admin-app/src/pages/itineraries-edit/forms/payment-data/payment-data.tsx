import * as React from 'react'
import { Controller } from 'react-hook-form'

import { Button, Card, Input, InputCurrency, InputDate, Select } from '../../../../components'
import { formatDateAmerican, scrollToTop } from '../../../../utils'

import { useFormItineraryRules, useListItinerariesRules, useUpdateItinerariesRule } from './hooks'
import { STRINGS } from './strings'

const installments = [
  {
    label: '1x',
    value: 1,
  },
  {
    label: '2x',
    value: 2,
  },
  {
    label: '3x',
    value: 3,
  },
  {
    label: '4x',
    value: 4,
  },
  {
    label: '5x',
    value: 5,
  },
  {
    label: '6x',
    value: 6,
  },
  {
    label: '7x',
    value: 7,
  },
  {
    label: '8x',
    value: 8,
  },
  {
    label: '9x',
    value: 9,
  },
  {
    label: '10x',
    value: 10,
  },
  {
    label: '11x',
    value: 11,
  },
  {
    label: '12x',
    value: 12,
  },
]

const getCorrectDate = (rawDate: string | Date) => {
  const date = new Date(rawDate)
  const offset = date.getTimezoneOffset()
  date.setMinutes(date.getMinutes() + offset)

  return date
}

const padLeftPercentage = (str: string) => {
  const parts = str.split('.')
  const firstPart = parts[0].padStart(2, '0')

  return `${firstPart}.${parts[1]}`
}

const cleanCurrency = (rawAmount: string) => Number(rawAmount.replace('R$ ', '').replace('.', '').replace(',', '.'))
const calculateDiscountInReals = (rawAmount: string, rawPercentage: string) => {
  const amount = rawAmount ? cleanCurrency(rawAmount) : 0
  const percentage = rawPercentage ? Number(rawPercentage.replace('%', '').replace('_', '')) : 0
  const discount = amount * (percentage / 100)

  return discount
}

export type Props = {
  id?: string
  onCancel: () => void
  onSuccess: () => void
  onError: () => void
}

export const PaymentData = ({ id, onCancel, onError, onSuccess }: Props) => {
  const { data, isFetching } = useListItinerariesRules(id || '')
  const {
    control: controlItineraryRules,
    formState: { errors: errorsItineraryRules },
    handleSubmit: handleSubmitItineraryRules,
    register: registerItineraryRules,
    reset: resetItineraryRules,
    watch: watchItineraryRules,
  } = useFormItineraryRules()
  const { isPending, mutateAsync } = useUpdateItinerariesRule()
  const firstAmount = watchItineraryRules('rules.0.seat_price') || ''
  const secondAmount = watchItineraryRules('rules.1.seat_price') || ''
  const firstDiscountPercentage = watchItineraryRules('rules.0.pix_discount') || ''
  const secondDiscountPercentage = watchItineraryRules('rules.1.pix_discount') || ''
  const firstDiscountAmount = calculateDiscountInReals(firstAmount, firstDiscountPercentage)
  const secondDiscountAmount = calculateDiscountInReals(secondAmount, secondDiscountPercentage)
  const firstAmountWithDiscount = (cleanCurrency(firstAmount) - firstDiscountAmount).toFixed(2)
  const secondAmountWithDiscount = (cleanCurrency(secondAmount) - secondDiscountAmount).toFixed(2)
  const hasSecondRule = data?.data?.[1]

  React.useEffect(() => {
    const formatedRules = data?.data?.map((rule: any) => {
      const pixDiscount = Number(rule.pix_discount) * 100

      return {
        ...rule,
        pix_discount: `${pixDiscount}`,
      }
    })

    resetItineraryRules({
      rules: [...(formatedRules || [])],
    })
  }, [data?.data])

  const handleOnSubmitItineraryRules = async (rawData: any) => {
    const rulesData = rawData.rules.map((rule: any) => ({
      ...rule,
      pix_discount: Number(rule.pix_discount.replace('%', '')) / 100,
      purchase_deadline: formatDateAmerican(rule.purchase_deadline),
      seat_price: rule.seat_price.replace('R$ ', '').replace('.', '').replace(',', '.'),
    }))

    try {
      await mutateAsync({
        itineraryId: id || '',
        payload: rulesData[0],
        ruleId: data?.data?.[0]?.id || '',
      })

      if (rulesData[1]) {
        await mutateAsync({
          itineraryId: id || '',
          payload: rulesData[1],
          ruleId: data?.data?.[1]?.id || '',
        })
      }

      onSuccess()
    } catch (err) {
      onError()
    }

    scrollToTop()
  }

  return isFetching ? (
    <div className="flex animate-pulse">
      <span className="w-full h-52 rounded-xl py-40 bg-gray-200 dark:bg-gray-700" />
    </div>
  ) : (
    <form className="flex flex-col gap-4" onSubmit={handleSubmitItineraryRules(handleOnSubmitItineraryRules)}>
      <Card>
        <div className="p-4 flex flex-col gap-8">
          <h2 className="font-semibold text-xl mb-2 dark:text-white">{STRINGS.title}</h2>
          <div className={`grid ${hasSecondRule ? 'md:grid-cols-2' : 'md:grid-cols-1'}  gap-4`}>
            <div className="flex flex-col gap-8">
              <Controller
                name="rules.0.purchase_deadline"
                control={controlItineraryRules}
                render={({ field: { value, ...rest } }) => (
                  <InputDate
                    id="rules.0.purchase_deadline"
                    label={STRINGS.form_input_first_subscription_deadline_label}
                    value={value ? getCorrectDate(value) : new Date()}
                    error={errorsItineraryRules.rules?.[0]?.purchase_deadline?.message}
                    {...rest}
                  />
                )}
              />
              <Controller
                name="rules.0.seat_price"
                control={controlItineraryRules}
                render={({ field: { value, ...rest } }) => (
                  <InputCurrency
                    id="rules.0.seat_price"
                    label={STRINGS.form_input_first_subscription_value_label}
                    placeholder={STRINGS.form_input_first_subscription_value_placeholder}
                    error={errorsItineraryRules.rules?.[0]?.seat_price?.message}
                    defaultValue={value}
                    {...rest}
                  />
                )}
              />
              <Controller
                name="rules.0.pix_discount"
                control={controlItineraryRules}
                render={({ field: { value, ...rest } }) => (
                  <Input
                    id="rules.0.pix_discount"
                    label={STRINGS.form_input_first_subscription_percentage_discount_label}
                    placeholder={STRINGS.form_input_first_subscription_percentage_discount_placeholder}
                    type="text"
                    mask="99.99%"
                    value={value ? padLeftPercentage(value) : '0'}
                    error={errorsItineraryRules.rules?.[0]?.pix_discount?.message}
                    {...rest}
                  />
                )}
              />
              <InputCurrency
                label={STRINGS.form_input_first_subscription_amount_with_discount_label}
                placeholder={STRINGS.form_input_first_subscription_percentage_discount_placeholder}
                value={firstAmountWithDiscount}
                disabled
              />
              <Select
                id="rules.0.installments"
                label={STRINGS.form_input_first_subscription_installments_label}
                placeholder={STRINGS.form_input_first_subscription_installments_placeholder}
                options={installments}
                error={errorsItineraryRules.rules?.[0]?.installments?.message}
                {...registerItineraryRules('rules.0.installments')}
              />
            </div>
            {hasSecondRule && (
              <div className="flex flex-col gap-8">
                <Controller
                  name="rules.1.purchase_deadline"
                  control={controlItineraryRules}
                  render={({ field: { value, ...rest } }) => (
                    <InputDate
                      id="rules.1.purchase_deadline"
                      label={STRINGS.form_input_second_subscription_deadline_label}
                      value={value ? getCorrectDate(value) : new Date()}
                      error={errorsItineraryRules.rules?.[1]?.purchase_deadline?.message}
                      {...rest}
                    />
                  )}
                />
                <Controller
                  name="rules.1.seat_price"
                  control={controlItineraryRules}
                  render={({ field: { value, ...rest } }) => (
                    <InputCurrency
                      id="rules.1.seat_price"
                      label={STRINGS.form_input_second_subscription_value_label}
                      placeholder={STRINGS.form_input_second_subscription_value_placeholder}
                      error={errorsItineraryRules.rules?.[1]?.seat_price?.message}
                      defaultValue={value}
                      {...rest}
                    />
                  )}
                />
                <Controller
                  name="rules.1.pix_discount"
                  control={controlItineraryRules}
                  render={({ field: { value, ...rest } }) => (
                    <Input
                      id="rules.1.pix_discount"
                      label={STRINGS.form_input_second_subscription_percentage_discount_label}
                      placeholder={STRINGS.form_input_second_subscription_percentage_discount_placeholder}
                      type="text"
                      mask="99.99%"
                      value={value ? padLeftPercentage(value) : '0'}
                      error={errorsItineraryRules.rules?.[1]?.pix_discount?.message}
                      {...rest}
                    />
                  )}
                />
                <InputCurrency
                  label={STRINGS.form_input_second_subscription_amount_with_discount_label}
                  placeholder={STRINGS.form_input_second_subscription_percentage_discount_placeholder}
                  value={secondAmountWithDiscount}
                  disabled
                />
                <Select
                  id="rules.1.installments"
                  label={STRINGS.form_input_second_subscription_installments_label}
                  placeholder={STRINGS.form_input_second_subscription_installments_placeholder}
                  options={installments}
                  error={errorsItineraryRules.rules?.[1]?.message}
                  {...registerItineraryRules('rules.1.installments')}
                />
              </div>
            )}
          </div>
        </div>
      </Card>
      <div className="flex justify-between">
        <Button label={STRINGS.form_button_cancel_label} type="button" variant="outline" onClick={onCancel} />
        <Button label={STRINGS.form_button_save_label} type="submit" loading={isPending} />
      </div>
    </form>
  )
}
