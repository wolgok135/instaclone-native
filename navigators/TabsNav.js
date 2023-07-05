import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Image, View } from "react-native";
import TabIcon from "../components/nav/TabIcon";

import StackNavFactory from "../components/nav/StackNavFactory";
import useMe from "../hooks/userMe";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
  const { data } = useMe();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "rgba(255,255,255,0.2)",
        },
      }}
    >
      <Tabs.Screen
        name="TabFeed"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName={"Feed"} />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabSearch"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName={"Search"} />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabCamera"
        component={View}
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Upload");
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"camera"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="TabNotifications"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"heart"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName={"Notifications"} />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabMe"
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Image
                source={{ uri: data?.me?.avatar }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  ...(focused && { borderColor: "white", borderWidth: 2 }),
                }}
              />
            ) : (
              <TabIcon iconName={"person"} color={color} focused={focused} />
            ),
        }}
      >
        {() => <StackNavFactory screenName={"Me"} />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
