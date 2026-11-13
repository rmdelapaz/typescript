// Task 2: the rows of the checkout
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { checkoutSchema, type CheckoutData, type CheckoutValues } from './schemas.ts'
import { supplyItems, supplyLabels } from './supplies.ts'

// One row to start with (typed with the schema's input type, so 'gloves' stays a SupplyItem)
const startValues: CheckoutValues = { rows: [{ item: 'gloves', count: '' }] }

interface CheckoutFormProps {
  onSave: (data: CheckoutData) => void
}

// TODO 2: draw the rows with useFieldArray ({ control, name: 'rows' }), keyed by field.id.
//   "Add a row" appends the first item not in the list yet and puts the cursor in its count (focusName);
//   "Remove row N" removes that row and puts the focus on "Add a row" (a ref).
// For now there is exactly one row, and Add a row does nothing.
export function CheckoutForm({ onSave }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(checkoutSchema), defaultValues: startValues })
  const index = 0
  const rowErrors = errors.rows?.[index]
  return (
    <form onSubmit={handleSubmit(onSave)} noValidate>
      <fieldset>
        <legend>Supplies taken</legend>
        <div>
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
        </div>
      </fieldset>
      <button type="button">Add a row</button>
      <button type="submit">Save the checkout</button>
    </form>
  )
}
