import './game.scss';
import Grid from "@/components/game/grid";

export default function Game() {
		return (
				<section className="game">
						<div className="container">
								<div className="game__wrap">
										<div className="game-frame">
												<Grid />
										</div>
								</div>
						</div>
				</section>
		);
};