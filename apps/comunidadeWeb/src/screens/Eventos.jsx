import { useState, useEffect, useMemo } from "react";
import { MagnifyingGlass, TrashIcon, PencilSimple, PlusIcon } from "@phosphor-icons/react";
import { ConfirmDelete } from "../components/confirmDelete";
import { AlertCustom } from "../components/alert";
import { useNavigate } from "react-router-dom";
import { ModalEvento } from "../components/modalEvento";

export default function Eventos() {

  const [search, setSearch] = useState("");
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const [defaultEventos, setDefaultEventos] = useState([]);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedEventoId, setSelectedEventoId] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvento, setEditingEvento] = useState(null);

  const navigate = useNavigate();

  // 🔹 Dados fake corrigidos com date ISO
  useEffect(() => {
    const fakeEventos = [
      { id: 1, nome: "Culto", semana: "Domingo", horario: "10h e 18h", date: "2026-05-12", repetir: false },
      { id: 2, nome: "Jovens", semana: "Sábado", horario: "20h", date: "2026-05-11", repetir: false },
      { id: 3, nome: "Oração", semana: "Quarta", horario: "20h", date: "2026-05-15", repetir: false },
      {
        id: 10,
        nome: "Culto oo",
        repetir: true,
        tipoRepeticao: "semanal",
        diaSemana: 0,
        horario: "10h"
      }
    ];

    setEventos(fakeEventos);
  }, []);

  const eventosAgrupados = useMemo(() => {
    const acc = {};

    eventos.forEach((evento) => {
      if (evento.repetir) {
        const key = `${evento.nome}-${evento.diaSemana}`;

        if (!acc[key]) {
          acc[key] = {
            ...evento,
            isGroup: true
          };
        }
      } else {
        acc[evento.id] = evento;
      }
    });

    return Object.values(acc);
  }, [eventos]);

  // 🔹 Filtro pesquisa
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredEventos([]);
      return;
    }

    const result = eventosAgrupados.filter((evento) =>
      (evento.nome || "").toLowerCase().includes(search.toLowerCase()) ||
      (evento.horario || "").toLowerCase().includes(search.toLowerCase()) ||
      (evento.semana || "").toLowerCase().includes(search.toLowerCase()) ||
      (evento.date || "").toLowerCase().includes(search.toLowerCase())
    );

    setFilteredEventos(result);
  }, [search, eventosAgrupados]);

  // 🔹 4 eventos mais próximos
  useEffect(() => {
    const today = new Date();

    const eventosComData = eventosAgrupados.filter(e => e.date);

    const sorted = [...eventosComData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return Math.abs(dateA - today) - Math.abs(dateB - today);
    });

    setDefaultEventos(sorted.slice(0, 4));
  }, [eventosAgrupados]);

  function handleDeleteClick(id) {
    setSelectedEventoId(id);
    setConfirmVisible(true);
  }

  function handleConfirmDelete() {
    setConfirmVisible(false);

    try {
      const updated = eventos.filter((evento) => evento.id !== selectedEventoId);
      setEventos(updated);

      setAlertType("success");
      setAlertTitle("Evento removido");
      setAlertMessage("O evento foi apagado com sucesso.");
    } catch (error) {
      setAlertType("error");
      setAlertTitle("Erro");
      setAlertMessage("Não foi possível apagar o evento.");
    }

    setAlertVisible(true);
  }

  function handleCancelDelete() {
    setConfirmVisible(false);

    setAlertType("warning");
    setAlertTitle("Operação cancelada");
    setAlertMessage("O evento não foi removido.");

    setAlertVisible(true);
  }

  function handleEdit(evento) {
    setEditingEvento(evento);
    setModalVisible(true);
  }

  function handleSaveEvento(data) {
    if (editingEvento) {
      const updated = eventos.map((ev) =>
        ev.id === editingEvento.id ? { ...editingEvento, ...data } : ev
      );
      setEventos(updated);
    } else {
      const newEvento = {
        id: Date.now(),
        ...data,
      };
      setEventos([...eventos, newEvento]);
    }

    setModalVisible(false);
  }

  const listaParaRenderizar =
    search.trim() === ""
      ? defaultEventos
      : filteredEventos;

  const diasSemana = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];

  return (
    <div className="pt-5 px-4 flex flex-col items-center gap-6">

      <div className="relative w-[95%]">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-3 px-4 pr-12 rounded-full bg-input dark:bg-input-dark shadow-md outline-none"
        />

        <MagnifyingGlass
          size={22}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-preto dark:text-branco"
        />
      </div>

      {/* 📋 Lista */}
      {listaParaRenderizar.map((evento) => (
        <div
          key={evento.id}
          className="w-[95%] bg-input dark:bg-input-dark rounded-2xl shadow-md px-4 py-3 flex justify-between items-center"
        >
          <div className="w-[72%]">

            <p className="font-normal text-preto dark:text-branco">
              {evento.nome}
            </p>

            {evento.isGroup ? (
              <>
                <p className="text-sm text-preto dark:text-branco">
                  {diasSemana[evento.diaSemana]}
                </p>
                <p className="text-xs text-cinza">
                  Todos os {diasSemana[evento.diaSemana].toLowerCase()}s
                </p>
              </>
            ) : (
              <div className="flex justify-between w-full">
                <p className="text-sm font-light text-preto dark:text-branco">
                  {evento.horario}
                </p>
                <p className="text-sm font-light text-preto dark:text-branco">
                  {evento.date}
                </p>
              </div>
            )}

          </div>

          <div className="flex gap-3">
            <button onClick={() => handleDeleteClick(evento.id)}>
              <TrashIcon size={30} className="text-vermelho" />
            </button>

            <button onClick={() => handleEdit(evento)}>
              <PencilSimple size={30} className="text-[#01CB34]" />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => {
          setEditingEvento(null);
          setModalVisible(true);
        }}
        className="absolute bottom-20 right-5 bg-vermelho shadow-md rounded-full p-4"
      >
        <PlusIcon className="text-branco" size={30} />
      </button>

      <ConfirmDelete
        visible={confirmVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <ModalEvento
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEvento}
        evento={editingEvento}
      />

      <AlertCustom
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
      />
    </div>
  );
}