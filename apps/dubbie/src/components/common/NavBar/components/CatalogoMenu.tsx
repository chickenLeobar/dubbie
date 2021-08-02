import {
  Box,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  Text,
  PopoverTrigger,
  Stack,
  SystemStyleObject,
} from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren, useCallback } from "react";
import {
  useEcommerceStore,
  selectCatalog,
  CatalogItem,
} from "@dubbie/stores/global/eccomerce";

const StylesMenuPopover: SystemStyleObject = {
  borderRadius: "0",
  display: "block",
};

const SubMenu = ({ item: { products, category } }: { item: CatalogItem }) => {
  return (
    <Box>
      <Text fontWeight="bold" my={2}>
        {category.name}
      </Text>
      <Box as="ul" listStyleType="none">
        {products.map((item, idx) => (
          <Link key={idx} as="li">
            {item.name}
          </Link>
        ))}
      </Box>
    </Box>
  );
};
const CatalogMenu: FunctionComponent<PropsWithChildren<{}>> = () => {
  const catalog = useEcommerceStore(
    useCallback((state) => selectCatalog(state, 3), [])
  );

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Link
          px={4}
          mx="4"
          color="white"
          fontSize="md"
          fontWeight="light"
          listStyleType="none"
          as="li"
        >
          Catalogo
        </Link>
      </PopoverTrigger>
      <PopoverContent sx={StylesMenuPopover} width="750px">
        <PopoverBody display="flex" justifyContent="center" py={4}>
          <Stack direction="row" spacing={10} py={3}>
            {catalog.map((item, idx) => (
              <SubMenu key={idx} item={item} />
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CatalogMenu;
