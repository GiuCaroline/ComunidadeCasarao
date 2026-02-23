import { useState, useEffect } from "react";
import { MagnifyingGlass, PlusIcon, PencilSimple } from "@phosphor-icons/react";
import { ConfirmDelete } from "../components/confirmDelete";
import { AlertCustom } from "../components/alert";
import { useNavigate } from "react-router-dom";

export default function Escalas(){
  const [search, setSearch] = useState("");
  const [escalas, setEscalas] = useState([]);
  const [filteredEscalas, setFilteredEscalas] = useState([]);
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedEscalaId, setSelectedEscalaId] = useState(null);

  useEffect(() => {
    const fakeEscalas = [
      { id: 1, gap: "Iluminação", cor: "#0077ff", diaSemana: 0, },
      { id: 2, gap: "Mídia", cor: "#FF0004", diaSemana: 0, },
      { id: 3, gap: "Som", cor: "#A148FF", diaSemana: 0, },
      
    ];

    setEscalas(fakeEscalas);
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredEscalas([]);
      return;
    }

    const result = escalas.filter(
      (escala) =>
        escala.gap.toLowerCase().includes(search.toLowerCase()) ||
        escala.diaSemana.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredEscalas(result);
  }, [search, escalas]);

  function handleDeleteClick(id) {
    setSelectedescalaId(id);
    setConfirmVisible(true);
  }

  function handleConfirmDelete() {
    setConfirmVisible(false);

    try {
      const updated = escalas.filter((escala) => escala.id !== selectedUscalaId);
      setEscalas(updated);

      setAlertType("success");
      setAlertTitle("Usuário removido");
      setAlertMessage("O usuário foi apagado com sucesso.");
    } catch (error) {
      setAlertType("error");
      setAlertTitle("Erro");
      setAlertMessage("Não foi possível apagar o usuário.");
    }

    setAlertVisible(true);
  }

  function handleCancelDelete() {
    setConfirmVisible(false);

    setAlertType("warning");
    setAlertTitle("Operação cancelada");
    setAlertMessage("O usuário não foi removido.");

    setAlertVisible(true);
  }

  const navigate = useNavigate();

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
          const key = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
          result[key] = true;
        }
      }
    });

    return result;
  }
  const markedDays = getMarkedDays(escalas, month, year);
  return(
      <div className="pt-5 px-4 flex flex-col items-center gap-6">
          <div className="relative w-[95%]">
              <input
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                  w-full py-3 px-4 pr-12
                  rounded-full
                  bg-input
                  dark:bg-input-dark
                  shadow-md
                  outline-none
              "
              />

              <MagnifyingGlass
              size={22}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-preto dark:text-branco"
              />
          </div>
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
              console.log("Dia clicado:", dateKey);
            }}
          />

          <button
              className="absolute bottom-20 right-5 bg-vermelho shadow-md rounded-full p-4"
          >
              <PlusIcon className="text-branco" size={30} />
          </button>
      </div>
  )
}