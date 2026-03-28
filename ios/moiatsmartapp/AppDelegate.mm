#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>
#import "RNSplashScreen.h"
#import "RNAppAuthAuthorizationFlowManager.h"
#import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate

// deep linking
- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
// deep linking

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  

  self.moduleName = @"moiatsmartapp";
  [GMSServices provideAPIKey:@"AIzaSyBof5e9_Hw7zILtYGeoTW9H8uqVPfCGmRo"];
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
//   if (self.authorizationFlowManagerDelegate) {
//     return [self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:url];
//   }
//   return [super application:app openURL:url options:options];
// }

@end
