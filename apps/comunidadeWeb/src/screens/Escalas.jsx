import { useState, useEffect } from "react";
import { PlusIcon, PencilSimple } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import MonthHeaderWeb from "../components/monthHeaderWeb";
import CustomCalendarWeb from "../components/customCalendarWeb";

export default function Escalas() {
  const [escalas, setEscalas] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const navigate = useNavigate();

  useEffect(() => {
    const fakeEscalas = [
      { id: 1, gap: "Iluminação", cor: "#0077ff", diaSemana: 6, data: "2026-03-08" },
      { id: 2, gap: "Mídia", cor: "#FF0004", diaSemana: 6 },
      { id: 3, gap: "Som", cor: "#A148FF", diaSemana: 6 },
    ];

    setEscalas(fakeEscalas);
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();

    const filtered = escalas.filter(
      (escala) => escala.diaSemana === dayOfWeek
    );

    setFilteredUsers(filtered);
  }, [selectedDate, escalas]);

  function handleEdit(escala) {
    navigate("/editar", { state: { escala } });
  }

  function getMarkedDays(escalas, month, year) {
    const result = {};

    escalas.forEach((escala) => {
      const totalDays = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);

        if (date.getDay() === escala.diaSemana) {
          const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          result[key] = true;
        }
      }
    });

    return result;
  }

  const markedDays = getMarkedDays(escalas, month, year);

  return (
    <div className="pt-5 px-4 flex flex-col items-center gap-6">
      <MonthHeaderWeb
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
      />

      <CustomCalendarWeb
        month={month}
        year={year}
        markedDays={markedDays}
        onSelectDay={(dateKey) => {
          setSelectedDate(dateKey);
        }}
      />

      {selectedDate &&
        filteredUsers.map((escala) => (
          <div
            key={escala.id}
            className="w-[95%] bg-input dark:bg-input-dark rounded-2xl shadow-md px-4 py-2 flex justify-between items-center"
          >
            <div>
              <p style={{ color: escala.cor }}>{escala.gap}</p>
              <p className="text-sm font-light text-preto dark:text-branco">
                Dia da semana: {escala.diaSemana}
              </p>
            </div>

            <button onClick={() => handleEdit(escala)}>
              <PencilSimple size={30} className="text-[#01CB34]" />
            </button>
          </div>
        ))}

      <button className="absolute bottom-20 right-5 bg-vermelho shadow-md rounded-full p-4">
        <PlusIcon className="text-branco" size={30} />
      </button>
    </div>
  );
}