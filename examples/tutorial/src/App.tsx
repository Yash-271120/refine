import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import { PostList, PostEdit, PostCreate, PostShow } from "./pages";
import "@pankod/refine/dist/styles.min.css"

function App() {
    return (
        <Admin
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com")}
        >
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
                show={PostShow}
            />
        </Admin>
    );
}

export default App;
