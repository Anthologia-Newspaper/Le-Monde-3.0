import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import './widgets/bot_nav.dart';
import './router/router.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final router = GoRouter( 
      routes: [
        ShellRoute(
          builder: (context, state, child) {
            return BottomNav(child);
          },
          routes: $appRoutes,
        ),
      ],
      initialLocation: '/write',
      redirect: (context, state) async {
        var storage = FlutterSecureStorage();
        String? token = await storage.read(key: 'token');
        if (token == null || token.isEmpty) {
          print('token null');
          return '/auth';
        }
      },
    );
    return MaterialApp.router(
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: Color.fromARGB(255, 16, 16, 16),
        // textTheme: ThemeData.dark().textTheme.apply(
        //   bodyColor: const Color.fromARGB(255, 0, 0, 0),
        //   displayColor: Colors.white
        // ),
        // colorScheme: ThemeData.dark().colorScheme.copyWith(
        //   primary: Color.fromARGB(255, 255, 255, 255),
        //   onPrimary: Colors.white,
        //   secondary: Color.fromARGB(255, 255, 255, 255)
        // ),
      ),
      routerConfig: router,
    );
  }
}