"use client";
import { ContainerBorder } from "@/components/containers/border/ContainerBorder";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { TitleH2 } from "@/components/ui/titles/Title";
import { observer } from "mobx-react-lite";

const containerContentsx: React.CSSProperties = {
  //   display: "flex",
  //   gap: "52px",

  marginTop: "48px",
  marginBottom: "48px",
};

const containeBordersx: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",

  // marginTop: "48px",
  // marginBottom: "48px",
};

export const MediaContent = observer(() => {
  return (
    <ContainerContent sx={containerContentsx}>
      <TitleH2>СМИ</TitleH2>
      <ContainerBorder style={containeBordersx}>
        <b>
          «Стоп» хандре. Как не стать жертвой плохого настроения пасмурной
          осенью
        </b>

        <a
          href="https://rostov.aif.ru/society/details/stop_handre_kak_ne_stat_zhertvoy_plohogo_nastroeniya_pasmurnoy_osenyu?ysclid=m77uka5k4v395674202"
          target="_blank"
        >
          Прочитать статью полностью
        </a>
      </ContainerBorder>
    </ContainerContent>
  );
});
