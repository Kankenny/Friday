import * as React from "react"
import dayjs, { Dayjs } from "dayjs"
import Button from "@mui/material/Button"
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker"
import { UseDateFieldProps } from "@mui/x-date-pickers/DateField"
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from "@mui/x-date-pickers/models"

interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs>,
    BaseSingleInputFieldProps<
      Dayjs | null,
      Dayjs,
      FieldSection,
      DateValidationError
    > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      className="text-3xl font-bold bg-green-500 hover:bg-green-900"
    >
      {label ?? "Pick a date"}
    </Button>
  )
}

function ButtonDatePicker(
  props: Omit<DatePickerProps<Dayjs>, "open" | "onOpen" | "onClose">
) {
  const [open, setOpen] = React.useState(false)

  return (
    <DatePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{
        field: { setOpen } as never,
        desktopPaper: {
          className: "bg-blue-50",
        },
        leftArrowIcon: { className: "text-blue-500" },
        rightArrowIcon: { className: "text-blue-500" },
        day: {
          className:
            "font-bold hover:bg-green-500 duration-200 ease-in-out caret-transparent",
        },
      }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      minDate={dayjs("2010-10-28")}
      maxDate={dayjs("2090-10-28")}
      showDaysOutsideCurrentMonth
      disableHighlightToday
    />
  )
}

export default function PickerWithButtonField() {
  const anotherDate = Date.now()
  const todaysDate = dayjs(anotherDate)
  const [value, setValue] = React.useState<Dayjs | null>(todaysDate)

  return (
    <ButtonDatePicker
      label={`${value == null ? "null" : value.format("MM/DD/YYYY")}`}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  )
}
