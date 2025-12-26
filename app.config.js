import appJson from './app.json';

export default ({ config }) => {
  let iosBundleId = "com.faustinodina.mydirectory";
  let androidPackage = "com.faustinodina.mydirectory";

  const profile = process.env.EAS_BUILD_PROFILE;

  if (profile === "development") {
    iosBundleId = "com.faustinodina.mydirectory.dev";
    androidPackage = "com.faustinodina.mydirectory.dev";
  } 
  else if (profile === "preview") {
    iosBundleId = "com.faustinodina.mydirectory.preview";
    androidPackage = "com.faustinodina.mydirectory.preview";
  }
  else if (profile === "production") {
    iosBundleId = "com.faustinodina.mydirectory";
    androidPackage = "com.faustinodina.mydirectory";
  }

  return {
    ...appJson,
    ios: {
      ...appJson.ios,
      bundleIdentifier: iosBundleId
    },
    android: {
      ...appJson.android,
      package: androidPackage
    }
  };
};
