import { Select } from "antd"

const options = [
  {
    "id": "chinese_simplified",
    "name": "简体中文"
  },
  {
    "id": "english",
    "name": "English"
  },
  {
    "id": "russian",
    "name": "Русский язык"
},
]

const languageOptions = options.map(item => ({ label: item.name, value: item.id }))

export default function LanguageSelect(props) {
  return <Select defaultValue="chinese_simplified" options={languageOptions} {...props}></Select>
}