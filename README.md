<h2>TODO</h2>
<p>I want to add an AI. The AI I used for my last version was a decent attempt, but I think either a genetic algorithm or a hamiltonian cycle based AI would be more effective</p>
<p>One idea I had was to find the longest path from the head to the tail of the snake by assigning a negative edge value for crossing tiles and using bellman-ford to find the shortest path. However this won't work as it will produce negative cycles, which results in the shortest path being negative infinity and the program running forever</p>
