App built to view what the current playoff status is of every NHL team. 

Record required to make the playoffs is calculated by:
- Calculating the projected points of teams in the third divisional playoff spot as well as the second conference wildcard spot 
- Subtracting the current team's points by the projected points for each playoff spot 
- Finding the record needed in the remainder of the season in order to hit 1 point above the proj. points for each playoff spot (record shown minimizes OTL, there are other combinations of wins/losses/OTL that can result in the same amount of points)

Live data acquired through [NHL API by dword4](https://github.com/dword4/nhlapi)