import { useState, useEffect } from "react";

export default function App() {
  const referenceProfile = {
    openness: 2,
    conscientiousness: 2,
    extraversion: 4,
    agreeableness: 0,
    emotional_stability: 0,
  };

  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(null);

  // Реальные вопросы (по 20 на фактор)
  const questionPool = {
    openness: [
      "Мне нравится узнавать новое и пробовать необычное.",
      "Я люблю читать книги или смотреть фильмы, которые заставляют задуматься.",
      "Я легко адаптируюсь к новым обстоятельствам.",
      "Я стараюсь расширять кругозор и интересы.",
      "Мне нравится обсуждать абстрактные идеи.",
      "Я люблю искусство и творчество.",
      "Я часто ищу нестандартные решения.",
      "Мне интересны разные культуры и традиции.",
      "Я быстро осваиваю новые навыки.",
      "Мне нравится экспериментировать.",
      "Я часто задаю себе философские вопросы.",
      "Я открыто принимаю чужие взгляды.",
      "Мне нравится изучать новые технологии.",
      "Я люблю пробовать новые блюда.",
      "Я часто ищу новые впечатления.",
      "Я предпочитаю разнообразие в жизни.",
      "Мне нравится учиться ради самого процесса.",
      "Я готов рисковать ради нового опыта.",
      "Я ценю креативных людей.",
      "Мне нравится выходить из зоны комфорта.",
    ],
    conscientiousness: [
      "Я обычно довожу дела до конца.",
      "Я заранее планирую свои действия.",
      "Мне важно соблюдать порядок.",
      "Я стараюсь выполнять обещания.",
      "Я редко опаздываю.",
      "Я предпочитаю действовать по плану.",
      "Я ответственно подхожу к обязанностям.",
      "Я умею концентрироваться на задаче.",
      "Я редко откладываю дела на потом.",
      "Я предпочитаю всё делать аккуратно.",
      "Мне нравится структурировать информацию.",
      "Я стараюсь избегать ошибок.",
      "Я всегда выполняю работу тщательно.",
      "Я умею расставлять приоритеты.",
      "Я стараюсь быть организованным человеком.",
      "Я редко забываю о делах.",
      "Я люблю системность.",
      "Я довожу начатое до конца.",
      "Я планирую свои финансы.",
      "Я несу ответственность за свои поступки.",
    ],
    extraversion: [
      "Я люблю бывать в компании людей.",
      "Я чувствую себя комфортно в центре внимания.",
      "Мне нравится знакомиться с новыми людьми.",
      "Я часто делюсь своими эмоциями.",
      "Я люблю выступать перед публикой.",
      "Я получаю энергию от общения.",
      "Мне нравится шумная атмосфера.",
      "Я часто звоню или пишу друзьям.",
      "Я предпочитаю активный отдых.",
      "Я быстро завожу новые знакомства.",
      "Я часто рассказываю истории.",
      "Мне нравится участвовать в вечеринках.",
      "Я чувствую себя уверенно среди незнакомцев.",
      "Я легко начинаю разговор.",
      "Я люблю командную работу.",
      "Я активно выражаю эмоции.",
      "Я предпочитаю шумные места тишине.",
      "Я люблю спорт и активность.",
      "Я быстро вхожу в коллектив.",
      "Я люблю общение больше, чем одиночество.",
    ],
    agreeableness: [
      "Я стараюсь помогать другим людям.",
      "Я легко иду на компромисс.",
      "Мне важно, чтобы люди вокруг чувствовали себя хорошо.",
      "Я умею слушать других.",
      "Я стараюсь избегать конфликтов.",
      "Я доверяю людям.",
      "Я люблю заботиться о близких.",
      "Я умею прощать.",
      "Я стараюсь быть вежливым.",
      "Я ценю дружбу.",
      "Я часто ставлю интересы других выше своих.",
      "Я стараюсь поддерживать коллег.",
      "Я умею работать в команде.",
      "Я стараюсь быть справедливым.",
      "Я проявляю сочувствие к другим.",
      "Я редко злюсь на людей.",
      "Я люблю помогать незнакомцам.",
      "Я ценю гармонию в отношениях.",
      "Я стараюсь избегать грубости.",
      "Я уважаю чужое мнение.",
    ],
    emotional_stability: [
      "Я сохраняю спокойствие даже в стрессовой ситуации.",
      "Я редко раздражаюсь по пустякам.",
      "Я умею контролировать эмоции.",
      "Я не поддаюсь панике.",
      "Я редко испытываю тревогу.",
      "Я быстро прихожу в норму после неудач.",
      "Я не принимаю всё близко к сердцу.",
      "Я умею сохранять хладнокровие.",
      "Я не зацикливаюсь на проблемах.",
      "Я редко чувствую стресс.",
      "Я легко справляюсь с волнением.",
      "Я редко чувствую раздражение.",
      "Я сохраняю оптимизм.",
      "Я редко нервничаю.",
      "Я не склонен к перепадам настроения.",
      "Я не драматизирую.",
      "Я умею держать себя в руках.",
      "Я спокойно отношусь к критике.",
      "Я редко чувствую неуверенность.",
      "Я умею сохранять внутренний баланс.",
    ],
  };

  useEffect(() => {
    // равномерный выбор: по 4 вопроса из каждой категории = 20
    const selected = [];
    for (let factor in questionPool) {
      const shuffled = [...questionPool[factor]].sort(() => Math.random() - 0.5);
      shuffled.slice(0, 4).forEach((q) =>
        selected.push({ text: q, factor })
      );
    }
    setQuestions(selected);
  }, []);

  const answerToPoints = (ans) => {
    if (!ans) return 0;
    if (ans.startsWith("A")) return 2;
    if (ans.startsWith("B")) return 1;
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const profile = {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      emotional_stability: 0,
    };
    questions.forEach((q, i) => {
      const ans = form.get("q" + i);
      profile[q.factor] += answerToPoints(ans);
    });

    const max = 8; // 4 вопроса * 2 балла макс.
    let sum = 0;
    const details = {};
    for (let k in referenceProfile) {
      const diff = Math.abs(referenceProfile[k] - profile[k]);
      const pct = Math.round(((max - diff) / max) * 100);
      details[k] = pct;
      sum += pct;
    }
    const overall = Math.round(sum / Object.keys(referenceProfile).length);
    let verdict =
      overall >= 75
        ? "Подходят ✅"
        : overall >= 50
        ? "Спорно ⚠️"
        : "Не подходят ❌";
    setResult({ profile, overall, verdict, details });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Тест совместимости (20 вопросов)
      </h1>

      {questions.length > 0 ? (
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 bg-white shadow-lg p-6 rounded-2xl"
        >
          {questions.map((q, i) => (
            <div key={i} className="p-3 border rounded-xl">
              <p className="font-medium mb-2">
                {i + 1}. {q.text}
              </p>
              <div className="flex flex-col gap-1">
                {["A) Согласен", "B) Иногда", "C) Не согласен"].map(
                  (opt, j) => (
                    <label key={j} className="cursor-pointer">
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={opt}
                        required
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  )
                )}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Посчитать совместимость
          </button>
        </form>
      ) : (
        <p className="text-center">Загрузка вопросов...</p>
      )}

      {result && (
        <div className="mt-6 p-6 bg-gray-50 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            Итоговая совместимость: {result.overall}% — {result.verdict}
          </h2>
          <div className="space-y-2">
            {Object.entries(result.details).map(([k, v]) => (
              <div key={k}>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>
                    {k === "openness"
                      ? "Открытость"
                      : k === "conscientiousness"
                      ? "Добросовестность"
                      : k === "extraversion"
                      ? "Экстраверсия"
                      : k === "agreeableness"
                      ? "Доброжелательность"
                      : "Эмоц. стабильность"}
                  </span>
                  <span>{v}% совпадение</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                    style={{ width: `${v}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
