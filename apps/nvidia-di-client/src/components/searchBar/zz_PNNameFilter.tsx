// implementation of search as you type for PN (incld debounce)
// import { css } from "@emotion/react";
// import { Input } from "antd";
// import { ChangeEvent, FC, useEffect, useState } from "react";
// import { useSearchContext } from "../../contexts/SearchContext";
// import useDebounce from "../../hooks/useDebounce";

// const PNNAME_DEBOUNCE_TIMEOUT = 700; // 700ms debounce

// const rootStyle = css`
//   width: 20vw;
// `;

// const PNNameFilter: FC = () => {
//   const searchContext = useSearchContext();
//   const { pnName, setPNName } = searchContext;

//   // Local state for the input
//   const [localPNName, setLocalPNName] = useState(pnName || "");

//   // Debounced value of the local state
//   const debouncedPNName = useDebounce(localPNName, PNNAME_DEBOUNCE_TIMEOUT);

//   useEffect(() => {
//     setPNName(debouncedPNName);
//   }, [debouncedPNName, setPNName]);

//   const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setLocalPNName(e.target.value);
//   };

//   return (
//     <Input css={rootStyle} value={localPNName} placeholder="PN name" onChange={onInputChange} />
//   );
// };

// export default PNNameFilter;
