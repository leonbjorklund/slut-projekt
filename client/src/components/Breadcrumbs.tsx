import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Breadcrumbs({ title }: { title: string }) {
  return (
    <Breadcrumb py={8} px={8}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to='/'>
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>{title}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
