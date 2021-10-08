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
import { FunctionComponent, PropsWithChildren } from "react";
import {
  selectCollectionsTree,
  useEcommerceStore,
} from "@dubbie/stores/global/eccomerce";

import { TCollection } from "@dubbie/@types/venduro.types";
import { TreeNode } from "@dubbie/utils/ArrayToTree";
import NextLink from "next/link";
const StylesMenuPopover: SystemStyleObject = {
  borderRadius: "0",
  display: "block",
};

const SubMenu = ({
  item: { name, children },
}: {
  item: TreeNode<TCollection>;
}) => {
  return (
    <Box>
      <Text fontWeight="bold" my={2}>
        {name}
      </Text>
      <Box as="ul" listStyleType="none">
        {children.map((item, idx) => (
          <NextLink
            key={idx}
            href={{
              pathname: "categories/[slug]",
              query: {
                slug: item.slug,
              },
            }}
            passHref
          >
            <Link as="li">{item.name}</Link>
          </NextLink>
        ))}
      </Box>
    </Box>
  );
};
const CatalogMenu: FunctionComponent<PropsWithChildren<{}>> = () => {
  const catalog = useEcommerceStore(selectCollectionsTree);

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
            {catalog.children.map((item, idx) => (
              <SubMenu key={idx} item={item} />
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CatalogMenu;
