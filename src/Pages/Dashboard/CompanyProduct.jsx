import { jwtDecode } from "jwt-decode";
import { useFetchUserProfileQuery } from "../../redux/apiSlices/authSlice";
import {
  useGetProductByCompanyQuery,
  useGetProductsQuery,
} from "../../redux/apiSlices/productSlice";
import { Table } from "antd";

const CompanyProduct = () => {
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const { userId } = decodedToken;

  const { data: companyProducts, isLoading } =
    useGetProductByCompanyQuery(userId);

  // const { data: companyProducts, isLoading } = useGetProductsQuery();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch,
  } = useFetchUserProfileQuery();

  if (isLoading || isProfileLoading) return <div>Loading...</div>;

  const companyProductsData = companyProducts?.data;
  const availableProducts = profileData?.data?.availableProducts;
  console.log(companyProductsData);

  const filteredAvailableProducts = companyProductsData.filter((product) =>
    availableProducts.includes(product._id)
  );

  // console.log(filteredAvailableProducts);

  const columns = [
    {
      title: "Serial No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  const dataSource = filteredAvailableProducts.map((product, index) => ({
    key: index + 1,
    name: product.name,
    category: product.category.title,
    price: product.salePrice,
    quantity: product.quantity,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold">Available Products</h1>
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default CompanyProduct;
