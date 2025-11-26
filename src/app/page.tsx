"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    mermaid: any;
  }
}

import styles from "./page.module.css";

export default function Home() {
  const [activeTab, setActiveTab] = useState("case1");
  console.log("activeTab", activeTab);
  const [sprintStatus, setSprintStatus] = useState("active");
  const [bugPathResult, setBugPathResult] = useState<React.ReactNode | null>(
    null
  );

  useEffect(() => {
    // Initialize Mermaid
    if (window.mermaid) {
      window.mermaid.initialize({ startOnLoad: true, theme: "neutral" });
    } else {
      const interval = setInterval(() => {
        if (window.mermaid) {
          window.mermaid.initialize({ startOnLoad: true, theme: "neutral" });
          clearInterval(interval);
        }
      }, 100);
    }
  }, []);

  const toggleAccordion = (e: React.MouseEvent<HTMLDivElement>) => {
    const header = e.currentTarget;
    const item = header.parentElement;
    if (item) {
      item.classList.toggle("active");
    }
  };

  const calculateBugPath = () => {
    if (sprintStatus === "active") {
      setBugPathResult(
        <div className="result-card result-safe" style={{ display: "block" }}>
          <div className="result-title" style={{ color: "var(--success)" }}>
            <span>🛠️</span> Acción: Flujo Estándar
          </div>
          <div className="result-details">
            <div className="detail-box">
              <div className="detail-label">Rama Origen</div>
              <div className="detail-value" style={{ color: "var(--primary)" }}>
                develop
              </div>
            </div>
            <div className="detail-box">
              <div className="detail-label">Rama Destino (Merge)</div>
              <div className="detail-value" style={{ color: "var(--primary)" }}>
                develop
              </div>
            </div>
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
            El sprint está activo. Simplemente corrige y actualiza la rama de
            desarrollo principal.
          </p>
        </div>
      );
    } else {
      setBugPathResult(
        <div className="result-card result-alert" style={{ display: "block" }}>
          <div className="result-title" style={{ color: "var(--danger)" }}>
            <span>🚨</span> Acción: Flujo de Hotfix / Release
          </div>
          <div className="result-details">
            <div className="detail-box">
              <div className="detail-label">Rama Origen</div>
              <div className="detail-value">release/sprint-N</div>
            </div>
            <div className="detail-box">
              <div className="detail-label">Rama Destino (Merge)</div>
              <div className="detail-value">release/sprint-N</div>
            </div>
          </div>
          <div
            style={{
              marginTop: "1rem",
              background: "white",
              padding: "1rem",
              borderRadius: "6px",
              border: "1px dashed var(--danger)",
            }}
          >
            <strong>⚠️ CRÍTICO: BACK-MERGE REQUERIDO</strong>
            <br />
            Una vez mergeado a Release, DEBES mergear esos cambios también a{" "}
            <code>develop</code> manualmente.
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Guía de Flujo & Gestión de Bugs</h1>
        <p className="subtitle">
          Documentación viva y herramientas de decisión para el equipo de
          desarrollo
        </p>
        <div style={{ marginTop: "1rem" }}>
          <a
            href="/quiz"
            className={styles.quizButton}
            style={{ textDecoration: "none" }}
          >
            <span>📝</span>
            <span style={{ marginLeft: "0.5rem" }}>Validar Conocimientos</span>
          </a>
        </div>
      </header>

      <section id="definitions">
        <h2>1. Definiciones y Convenciones</h2>
        <p style={{ marginBottom: "1rem" }}>
          Conceptos clave para entender el flujo de trabajo.
        </p>

        <div className="accordion">
          <div className="accordion-item">
            <div className="accordion-header" onClick={toggleAccordion}>
              Ramas Principales
            </div>
            <div className="accordion-content">
              <p>
                <strong>
                  <span className="badge bg-dev">Develop</span>
                </strong>
                : Rama de integración continua. Aquí vive el código del sprint
                actual. Todo feature debe nacer y morir aquí durante el
                desarrollo.
              </p>
              <br />
              <p>
                <strong>
                  <span className="badge bg-rel">Release/Sprint-N</span>
                </strong>
                : Rama congelada para QA final antes de producción. Se crea al
                cerrar el código del Sprint. Solo admite Bug Fixes.
              </p>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-header" onClick={toggleAccordion}>
              Columnas del Tablero Hub/Marketplace
            </div>
            <div className="accordion-content">
              <ul>
                <li>
                  <strong>To Do:</strong> Tareas pendientes.
                </li>
                <li>
                  <strong>In Progress:</strong> Desarrollo activo.
                </li>
                <li>
                  <strong>Review:</strong>Desarrollo mergeado en Develop y Tag
                  asignado..
                </li>
                <li>
                  <strong>QA:</strong>Tarea en certificación por QA{" "}
                </li>
                <li>
                  <strong>Done:</strong> QA Aprobado y libre de bugs.
                </li>
              </ul>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-header" onClick={toggleAccordion}>
              Columnas del Tablero Altio
            </div>
            <div className="accordion-content">
              <ul>
                <li>
                  <strong>To Do:</strong> Tareas pendientes.
                </li>
                <li>
                  <strong>In Progress:</strong> Desarrollo activo.
                </li>
                <li>
                  <strong>IN QA:</strong>Desarrollo mergeado en Develop.
                </li>
                <li>
                  <strong>UAT:</strong> Tarea en certificación por QA.
                </li>
                <li>
                  <strong>Done:</strong> QA Aprobado y libre de bugs.
                </li>
              </ul>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-header" onClick={toggleAccordion}>
              Tags y Nomenclatura
            </div>
            <div className="accordion-content">
              <p>
                El uso de <strong>Tags</strong> es obligatorio para marcar
                entregables a QA.
              </p>
              <p>
                Formato: <code>Semana 48 y 49 2025 - R6</code> (ej. R6)
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="flow-diagram">
        <h2>2. Visualizador de Flujo</h2>
        <p style={{ marginBottom: "1rem" }}>
          Diagrama lógico de ciclo de vida de una tarea y gestión de defectos.
        </p>

        <div className="mermaid-container">
          <div className="mermaid">
            {`
            graph TD
                Start([Inicio Tarea]) --> Dev[Desarrollo]
                Dev --> PR[Pull Request]
                PR --> MergeDev[Merge a Develop]
                MergeDev --> Tag[Asignar Tag]
                Tag --> QA[QA Testing]
                
                QA --> Decision{¿Hay Bugs?}
                Decision -- No --> Done([Done / Aprobado])
                
                Decision -- Sí --> Bug[Crear Ticket Bug]
                Bug --> CheckSprint{¿Sprint Cerrado?<br>Existe Release Branch?}
                
                CheckSprint -- No <br>(Sprint en Curso) --> FixDev[Fix en Develop]
                FixDev --> MergeDev
                
                CheckSprint -- Sí <br>(Sprint Cerrado) --> FixRel[Fix en Release Branch]
                FixRel --> QA2[QA Retest]
                QA2 --> MergeRel[Merge a Release]
                MergeRel --> BackMerge[CRÍTICO: Back-merge a Develop]
                BackMerge --> Done
            `}
          </div>
        </div>
      </section>

      <section id="bug-decider">
        <h2>3. El Decisor de Bugs</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          Responde las preguntas para calcular la ruta de corrección exacta.
        </p>

        <div className="decider-form">
          <div className="form-group">
            <label>
              ¿Cuál es el estado del Sprint asociado al Tag con error?
            </label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="sprintStatus"
                  value="active"
                  checked={sprintStatus === "active"}
                  onChange={() => setSprintStatus("active")}
                />
                <span>En Curso / No existe rama Release</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="sprintStatus"
                  value="closed"
                  checked={sprintStatus === "closed"}
                  onChange={() => setSprintStatus("closed")}
                />
                <span>Cerrado / Existe rama Release (Code Freeze)</span>
              </label>
            </div>
          </div>

          <button className="btn-calculate" onClick={calculateBugPath}>
            Calcular Ruta de Corrección
          </button>
        </div>

        <div
          id="result-container"
          style={{ display: bugPathResult ? "block" : "none" }}
        >
          {bugPathResult}
        </div>
      </section>

      <section id="examples">
        <h2>4. Ejemplos Prácticos</h2>

        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "case1" ? "active" : ""}`}
            onClick={() => setActiveTab("case1")}
          >
            Caso 1: Bug Sprint Actual
          </button>
          <button
            className={`tab-btn ${activeTab === "case2" ? "active" : ""}`}
            onClick={() => setActiveTab("case2")}
          >
            Caso 2: Bug Sprint Anterior/Release
          </button>
        </div>
        {activeTab === "case1" && (
          <div
            id="case1"
            className={`tab-content ${activeTab === "case1" ? "active" : ""}`}
          >
            <div className="example-box">
              <h3>Escenario:</h3>
              <p>
                Estamos a mitad del Sprint 15. QA encuentra un error en el
                Login.
              </p>
              <hr
                style={{
                  margin: "1rem 0",
                  border: 0,
                  borderTop: "1px solid #ccc",
                }}
              />
              <p>
                <strong>Procedimiento:</strong>
              </p>
              <ol style={{ marginLeft: "1.5rem" }}>
                <li>
                  El desarrollador crea rama <code>fix/login-error</code> desde{" "}
                  <strong>develop</strong>.
                </li>
                <li>Corrige el error.</li>
                <li>
                  PR y Merge hacia <strong>develop</strong>.
                </li>
                <li>Se genera nuevo Tag para QA.</li>
              </ol>
            </div>
          </div>
        )}

        {activeTab === "case2" && (
          <div
            id="case2"
            className={`tab-content ${activeTab === "case2" ? "active" : ""}`}
          >
            <div className="example-box">
              <h3>Escenario:</h3>
              <p>
                El código del Sprint 15 se cerró ayer. Existe la rama{" "}
                <code>release/sprint-15</code>. QA encuentra un error crítico.
              </p>
              <hr
                style={{
                  margin: "1rem 0",
                  border: 0,
                  borderTop: "1px solid #ccc",
                }}
              />
              <p>
                <strong>Procedimiento:</strong>
              </p>
              <ol style={{ marginLeft: "1.5rem" }}>
                <li>
                  El desarrollador crea rama <code>fix/critical-error</code>{" "}
                  desde <strong>release/sprint-15</strong>.
                </li>
                <li>Corrige el error.</li>
                <li>
                  PR y Merge hacia <strong>release/sprint-15</strong>.
                </li>
                <li style={{ color: "var(--danger)", fontWeight: "bold" }}>
                  IMPORTANTE: Realizar Back-merge de los cambios hacia develop
                  para no perder el fix en el futuro.
                </li>
              </ol>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
