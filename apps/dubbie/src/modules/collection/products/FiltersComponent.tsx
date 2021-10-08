import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Text,
  CheckboxGroup,
  VStack,
  Checkbox,
} from "@chakra-ui/react";
import {
  useEcommerceStore,
  actionsSelector,
} from "@dubbie/stores/global/eccomerce";
import { FacetWithValues } from "@dubbie/@types/venduro.types";
import { ChangeEvent, useRef } from "react";
import { useRouter } from "next/router";

type PropsFilters = {
  facets: FacetWithValues[];
};

export const FiltersComponent = ({ facets }: PropsFilters) => {
  const router = useRouter();
  const { current: facetsIdsSet } = useRef(new Set());

  const { setPartialState } = useEcommerceStore(actionsSelector);

  const onChangue = (e: ChangeEvent<HTMLInputElement>) => {
    const facetId = e.target.value;
    if (facetsIdsSet.has(facetId)) {
      facetsIdsSet.delete(facetId);
    } else {
      facetsIdsSet.add(facetId);
    }
    setPartialState({
      selectedFacetsIds: Array.from(facetsIdsSet.values()) as number[],
    });
  };

  return (
    <Accordion defaultIndex={[0]} defaultChecked allowMultiple>
      {facets.map((item, idx) => (
        <AccordionItem key={idx}>
          <AccordionButton>
            <Text textAlign="left" flex="1">
              {item.name}
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <CheckboxGroup>
              <VStack alignItems="start">
                {item.values.map((val, idx) => (
                  <Checkbox onChange={onChangue} value={val.id} key={idx}>
                    {val.name}
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FiltersComponent;

/**
 * TODO:
 * - show price 
 *      {/* <AccordionItem>
          <AccordionButton>
            <Text textAlign="left" flex="1">
              Precio
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Flex wrap="wrap">
              {Array(6)
                .fill(null)
                .map((_, idx) => (
                  <Badge as="button" key={idx} margin={"2"}>
                    10 - 50
                  </Badge>
                ))}
            </Flex>
          </AccordionPanel>
        </AccordionItem> 
 */
