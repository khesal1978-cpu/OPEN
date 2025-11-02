import BottomNav from "../BottomNav";
import { Route, Switch } from "wouter";

export default function BottomNavExample() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Switch>
        <Route path="/">
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold">Mine Page</h1>
          </div>
        </Route>
        <Route path="/team">
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold">Team Page</h1>
          </div>
        </Route>
      </Switch>
      <BottomNav />
    </div>
  );
}
