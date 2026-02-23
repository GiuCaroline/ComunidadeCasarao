import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const months = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

export default function MonthHeaderWeb({ month, year, setMonth, setYear }) {

  function handlePrev() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function handleNext() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  return (
    <div className="flex justify-between items-center bg-input dark:bg-input-dark rounded-full px-4 py-2 mb-4">

      <button onClick={handlePrev}>
        <CaretLeft size={20} className="text-preto dark:text-branco"/>
      </button>

      <span className="bg-vermelho text-branco px-4 py-1 rounded-full text-sm">
        {months[month]} {year}
      </span>

      <button onClick={handleNext}>
        <CaretRight size={20} className="text-preto dark:text-branco"/>
      </button>

    </div>
  );
}