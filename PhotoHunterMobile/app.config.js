export default {
    "expo": {
        "name": process.env.PHOTOHUNTER_NAME,
        "slug": "PhotoHunter",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/photohunter_logo.png",
        "splash": {
            "image": "./assets/photohunter_logo.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        "updates": {
            "fallbackToCacheTimeout": 0
        },
        "assetBundlePatterns": [
            "**/*"
        ],
        "ios": {
            "config": {
                "googleMapsApiKey": process.env.PHOTOHUNTER_IOS_GOOGLE_MAPS_API_KEY
            },
            "supportsTablet": true,
            "bundleIdentifier": "de.flooooooooooorian.photohunter",
            "buildNumber": "1.0.2"
        },
        "android": {
            "config": {
                "googleMaps": {
                    "apiKey": process.env.PHOTOHUNTER_ANDROID_GOOGLE_MAPS_API_KEY
                },
                "googleMobileAdsAppId": "ca-app-pub-1201256601321447~1898634638"
            },
            "package": "de.flooooooooooorian.photohunter",
            "versionCode": 3,
            "adaptiveIcon": {
                "foregroundImage": "./assets/photohunter_logo.png",
                "backgroundColor": "#FFFFFF"
            }
        },
        "web": {
            "favicon": "./assets/photohunter_logo.png",
            "build": {
                "babel": {
                    "include": ["react-router-native"]
                }
            }
        }
    }

}
