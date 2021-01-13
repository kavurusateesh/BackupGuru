import React, { Component } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import Content from './Content';
import Footer from './Footer';

class App extends Component {

  render() {


    const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
      return (
        <Route
          path={path}
          {...rest}
          render={(props) => {
            return loggedIn ? (
              <Comp {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    prevLocation: path,
                    error: "You need to login first!",
                  },
                }}
              />
            );
          }}
        />
      );
    };

















    // return (
    //   <div>
    //           <body>
    //   <section className="content_wrapper">
    //   <header id="header">
    //     <Header />
    //     <SideBar />
    //     {/* <Content />  */}
    //       <Footer />
    //       </header>
    //       </section>
    //       </body>
    //   </div>
    // );
  }
}

export default App;