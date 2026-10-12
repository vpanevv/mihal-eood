import type { ComponentType } from 'react'
import {
  DryingIcon,
  FingerJointIcon,
  ImpregnationIcon,
  PaintIcon,
  PlaneIcon,
  SandingIcon,
} from '../components/Icons'

export type Service = {
  title: string
  /** Set in the serif, so the description reads as a different voice from the labels. */
  text: string
  Icon: ComponentType<{ className?: string }>
  /** Photograph of the work; leads the card where there is one, as on the product cards. */
  photo?: string
}

/** What the yard does to the timber before it leaves. */
export const SERVICES: Service[] = [
  {
    title: 'Сушене',
    text: 'Контролирано сушене на дървения материал до оптимална влажност. Така намаляваме риска от измятане, напукване и деформации при последваща обработка.',
    Icon: DryingIcon,
    photo: '/images/services/sushene.jpg',
  },
  {
    title: 'Рендосване',
    text: 'Прецизно рендосване за равна, гладка повърхност и точни размери. Материалът е готов за директна употреба или последваща обработка.',
    Icon: PlaneIcon,
    photo: '/images/services/rendosvane.jpg',
  },
  {
    title: 'Шлайфане',
    text: 'Фино шлайфане за гладка и равномерна повърхност без груби участъци. Подготвяме дървесината отлично за боядисване, омасляване или монтаж.',
    Icon: SandingIcon,
    photo: '/images/services/shlayfane.jpg',
  },
  {
    title: 'Боядисване',
    text: 'Мажем с висококачествени масла на ОЛМО.',
    Icon: PaintIcon,
    photo: '/images/services/boyadisvane.jpg',
  },
  // Still on icons until photographs of these two arrive.
  {
    title: 'Импрегниране',
    text: 'Професионално импрегниране за по-добра защита на дървесината от влага, атмосферни влияния, плесени и вредители. Удължаваме живота на материала и запазваме неговите качества.',
    Icon: ImpregnationIcon,
  },
  {
    title: 'Клинозъбене',
    text: 'Прецизно клинозъбно съединяване за получаване на здрави и стабилни дървени елементи с по-голяма дължина. Подходящо за конструкции и изделия, при които се изисква висока устойчивост.',
    Icon: FingerJointIcon,
  },
]

export const PROCESS: { title: string; text: string }[] = [
  { title: 'Запитване', text: 'Обаждане или форма' },
  { title: 'Оферта до 24 часа', text: 'Цена по размери и количество' },
  { title: 'Подготовка', text: 'Рязане и подреждане' },
  { title: 'Доставка', text: 'До обекта, с разтоварване' },
]

export const DELIVERY_TOWNS = [
  'Разлог',
  'Банско',
  'Добринище',
  'Баня',
  'Якоруда',
  'Гоце Делчев',
  'Благоевград',
  'София',
]

export const FAQ: { q: string; a: string }[] = [
  {
    q: 'Доставяте ли извън Разлог?',
    a: 'Да. Доставяме със собствен транспорт в цялата страна. Цената на доставката зависи от количеството и адреса на обекта.',
  },
  {
    q: 'Колко е сух материалът?',
    a: 'Материалът се суши в собствена камера и отлежава един месец след сушенето, преди да влезе в продажба.',
  },
  {
    q: 'Режете ли по размер?',
    a: 'Да. Изпратете ни дължините и сеченията, които ви трябват — по телефона или през формата за запитване.',
  },
  {
    q: 'Как да получа оферта?',
    a: 'Обадете се на 0888 726 194 или опишете материала, количеството и населеното място във формата. Можете да прикачите и спецификация.',
  },
  {
    q: 'Какво е работното време на склада?',
    a: 'От понеделник до петък, 08.00 – 17.00 ч. Събота и неделя са почивни дни.',
  },
]
