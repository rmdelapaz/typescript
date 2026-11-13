// Task 2: the rows of the checkout
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { checkoutSchema, type CheckoutData, type CheckoutValues } from './schemas.ts'
import { supplyItems, supplyLabels } from './supplies.ts'

// One row to start with (typed with the schema's input type, so 'gloves' stays a SupplyItem)
const startValues: CheckoutValues = { rows: [{ item: 'gloves', count: '' }] }

interface CheckoutFormProps {
  onSave: (data: CheckoutData) => void
}

export function CheckoutForm({ onSave }: CheckoutFormProps) {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(checkoutSchema), defaultValues: startValues })
  // One entry per row, each with a generated id: the key that stays with the row's data
  const { fields, append, remove } = useFieldArray({ control, name: 'rows' })
  const addRef = useRef<HTMLButtonElement>(null)
  const full = fields.length >= supplyItems.length

  function addRow() {
    // getValues: what the boxes hold NOW (fields only has what each row started with)
    const used = getValues('rows').map((row) => row.item)
    const next = supplyItems.find((item) => !used.includes(item))
    if (next === undefined) {
      return
    }
    // The new row's index is fields.length: the cursor goes to its count
    append({ item: next, count: '' }, { focusName: `rows.${fields.length}.count` })
  }

  function removeRow(index: number) {
    remove(index)
    // The Remove button that had the focus is gone: give the focus a home
    addRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit(onSave)} noValidate>
      <fieldset>
        <legend>Supplies taken</legend>
        {fields.map((field, index) => {
          // This row's problems: an entry only when the row has one
          const rowErrors = errors.rows?.[index]
          return (
          <div key={field.id}>
            <label htmlFor={`rows.${index}.item`}>Item, row {index + 1}</label>
            <select id={`rows.${index}.item`} {...register(`rows.${index}.item`)}>
              {supplyItems.map((item) => (
                <option key={item} value={item}>{supplyLabels[item]}</option>
              ))}
            </select>
            {rowErrors?.item && <p>{rowErrors.item.message}</p>}
            <label htmlFor={`rows.${index}.count`}>How many, row {index + 1}</label>
            <input id={`rows.${index}.count`} inputMode="numeric" {...register(`rows.${index}.count`)} />
            {rowErrors?.count && <p>{rowErrors.count.message}</p>}
            <button type="button" onClick={() => removeRow(index)}>
              Remove row {index + 1}
            </button>
          </div>
          )
        })}
      </fieldset>
      {/* aria-disabled, not disabled: a disabled button cannot hold the focus Remove gives it */}
      <button type="button" ref={addRef} aria-disabled={full} onClick={addRow}>
        Add a row
      </button>
      <button type="submit">Save the checkout</button>
    </form>
  )
}
