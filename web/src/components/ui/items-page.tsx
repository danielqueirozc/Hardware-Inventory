import { useParams } from "react-router-dom";
import { Computers } from "../types/computer";
import { Components } from "../types/components";
import { Materials } from "../types/materials";
import { Notebooks } from "../types//notebooks";
import { Cables } from "../types/cables";

export function ItemsPage() {
  const { type } = useParams<{ type: string }>()

  const COMPONENT_MAP = {
    'Computer': <Computers />,
    'Component': <Components />,
    'Materials': <Materials />,
    'Notebook': <Notebooks />,
    'Cables': <Cables />
  }

  // Retorna o componente correspondente ao tipo ou uma mensagem de erro se o tipo não for encontrado
  // type é o mesmo do useParams
  //  O TypeScript está dizendo "type pode ser qualquer string!", mas você sabe que só quer as chaves que existem no chaveiro. O as keyof typeof diz: "confia em mim, type é uma das chaves válidas"  
  return COMPONENT_MAP[type as keyof typeof COMPONENT_MAP] || <div>Tipo não encontrado</div>
}
