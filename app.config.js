export default ({ config }) => {
  let iosBundleId = "com.faustinodina.mydirectory";
  let androidPackage = "com.faustinodina.mydirectory";

  // this was done for being able to install a demo and a development versions simultaneously
  // const profile = process.env.EAS_BUILD_PROFILE;

  // if (profile === "development") {
  //   iosBundleId = "com.faustinodina.mydirectory";
  //   androidPackage = "com.faustinodina.mydirectory";
  // }
  // else if (profile === "preview") {
  //   iosBundleId = "com.faustinodina.mydirectory";
  //   androidPackage = "com.faustinodina.mydirectory";
  // }
  // else if (profile === "production") {
  //   iosBundleId = "com.faustinodina.mydirectory";
  //   androidPackage = "com.faustinodina.mydirectory";
  // }

  return {
    ...config,
    ios: {
      ...config.ios,
      bundleIdentifier: iosBundleId
    },
    android: {
      ...config.android,
      package: androidPackage
    }
  };
};
