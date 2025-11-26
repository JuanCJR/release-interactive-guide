import ReleaseFlowQuiz from "@/components/ReleaseFlowQuiz";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./page.module.css";

export default function QuizPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft className={styles.backIcon} />
            Volver al inicio
          </Link>
          <h1 className={styles.title}>Validación de Conocimientos</h1>
          <p className={styles.description}>
            Pon a prueba tu comprensión sobre el flujo de release y gestión de
            bugs.
          </p>
        </div>

        <ReleaseFlowQuiz />
      </div>
    </div>
  );
}
